// biome-ignore assist/source/organizeImports: dotenv import must remain at the top
import 'dotenv/config';
import { getPayload } from 'payload';
import type { User } from '@/payload-types';

import config from '../payload.config';
import users from '../../seeds/users.json';

/**
 * User definitions to seed
 * Note: Users will be created/updated with a default password if they don't exist
 * The password can be changed later through the admin UI or password reset
 */
const USERS = users;

/**
 * Default password for seeded users (should be changed after first login)
 */
const DEFAULT_PASSWORD = 'ChangeMe123!';

async function seedUsers() {
  console.log('[seed-users] Starting...');

  const payload = await getPayload({ config });

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const userData of USERS) {
    try {
      // Check if user already exists by email or userUid
      const existingByEmail = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: userData.email,
          },
        },
        limit: 1,
      });

      const existingByUid = await payload.find({
        collection: 'users',
        where: {
          userUid: {
            equals: userData.userUid,
          },
        },
        limit: 1,
      });

      const existingUser = existingByEmail.docs[0] || existingByUid.docs[0];

      if (existingUser) {
        console.log(`[seed-users] User "${userData.email}" already exists, updating...`);

        // Update existing user (including password if provided)
        const updateData: {
          userUid: string;
          password?: string;
          roles?: User['roles'];
        } = {
          userUid: userData.userUid,
          roles: userData.roles as User['roles'],
        };

        // Update password if provided
        if (userData.password) {
          updateData.password = userData.password;
        }

        await payload.update({
          collection: 'users',
          id: existingUser.id,
          data: updateData,
        });

        updatedCount++;
        if (userData.password) {
          console.log(`[seed-users] Updated password for user "${userData.email}"`);
        }
      } else {
        console.log(`[seed-users] Creating user: ${userData.email}`);

        // Step 1: Create user with dummy password first
        const createdUser = await payload.create({
          collection: 'users',
          data: {
            id: userData.id,
            userUid: userData.userUid,
            email: userData.email,
            password: DEFAULT_PASSWORD, // Dummy password
            roles: userData.roles as User['roles'],
          },
        });

        // Step 2: Update password with actual password
        if (userData.password) {
          await payload.update({
            collection: 'users',
            id: createdUser.id,
            data: {
              password: userData.password,
            },
          });
          console.log(`[seed-users] Set password for user "${userData.email}"`);
        }

        createdCount++;
        console.log(
          `[seed-users] Created user "${userData.email}"${userData.password ? ' with specified password' : ` with default password: ${DEFAULT_PASSWORD}`}`,
        );
      }
    } catch (error) {
      console.error(`[seed-users] Error processing user "${userData.email}":`, error);
      skippedCount++;
    }
  }

  console.log('[seed-users] Done!');
  console.log(
    `[seed-users] Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skippedCount}`,
  );
  if (createdCount > 0) {
    console.log(
      `[seed-users] ⚠️  New users were created with default password: ${DEFAULT_PASSWORD}`,
    );
    console.log(`[seed-users] ⚠️  Please change passwords after first login!`);
  }
  process.exit(0);
}

seedUsers().catch((error) => {
  console.error('[seed-users] Fatal error:', error);
  process.exit(1);
});
