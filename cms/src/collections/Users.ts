import { isBefore } from 'date-fns';
import {
  type ClientUser,
  type CollectionConfig,
  generatePayloadCookie,
  getFieldsToSign,
  jwtSign,
  type PayloadRequest,
} from 'payload';

import { config } from '@/config';
import type { User } from '@/payload-types';
import { sanitizeInternalFields } from '@/utils/sanitizeInternalFields';
import { codeUid, uid } from '@/utils/uid';

const hidden = ({ user }: { user?: ClientUser }) => {
  return !user?.roles.includes('SUPER_ADMIN') && !user?.roles.includes('ADMIN');
};

const canEdit = ({ req }: { req: PayloadRequest }) => {
  if (!req.user) return false;

  return !hidden({ user: req.user });
};

const canDelete = ({ req }: { req: PayloadRequest }) => {
  if (!req.user) return false;

  return !req.user?.roles.includes('SUPER_ADMIN');
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden,
  },
  access: {
    create: canEdit,
    update: canEdit,
    delete: canDelete,
  },
  auth: {
    useSessions: false,
    tokenExpiration: 60 * 60 * 24 * 30, // 30 days
  },
  fields: [
    {
      name: 'userUid',
      type: 'text',
      required: true,
      unique: true,
      defaultValue: () => uid.stamp(16),
    },
    // Email added by default
    // Add more fields as needed
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      defaultValue: ['READ_ONLY'],
      options: [
        { label: 'Super Admin', value: 'SUPER_ADMIN' },
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Write', value: 'WRITE' },
        { label: 'Read-only', value: 'READ_ONLY' },
      ],
      filterOptions: ({ req, options }) => {
        if (req.user && !req.user.roles.includes('SUPER_ADMIN')) {
          return options.filter(({ value }: any) => value !== 'SUPER_ADMIN');
        }

        return options;
      },
      saveToJWT: true,
      access: {
        // Only admins can set/update roles
        update: ({ req: { user } }) => {
          return !!(user?.roles.includes('SUPER_ADMIN') || user?.roles.includes('ADMIN'));
        },
      },
    },
    {
      name: 'loginCode',
      type: 'text',
      unique: true,
      required: false,
    },
    {
      name: 'loginCodeExpiresAt',
      type: 'date',
      required: false,
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeLogin: [
      async ({ user, req }) => {
        // Update lastLogin timestamp
        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: {
            lastLoginAt: new Date().toISOString(),
          },
        });
      },
    ],
  },
  endpoints: [
    {
      path: '/login/code',
      method: 'post',
      handler: async (req) => {
        const { payload } = req;
        const body = await req.json?.();
        const { email } = body as unknown as { email: string };

        const user = await payload
          .find({
            collection: 'users',
            where: {
              email: {
                equals: email,
              },
            },
          })
          .then((user) => {
            return user.docs[0];
          });

        if (!user) {
          return new Response('User not found', { status: 404 });
        }

        const code = codeUid.rnd();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 5);

        let result: Response;

        try {
          await payload.update({
            collection: 'users',
            id: user.id,
            data: { loginCode: code, loginCodeExpiresAt: expiresAt.toISOString() },
          });

          try {
            if (config.emailTransport.off) {
              payload.logger.info('\n\n\t⚠️ Email transport is OFF, not sending email. ⚠️\n\n');
            } else {
              await payload.sendEmail({
                to: email,
                subject: `${process.env.NEXT_BRAND_COMPANY_NAME} - Login Code`,
                text: `Your login code is: ${code}`,
              });
            }

            payload.logger.info(`\n\n\t🔑 Code sent (${email}): ${code}\n\n`);
            result = new Response('Code sent to email', { status: 200 });
          } catch (error) {
            console.error(error);

            result = await payload
              .update({
                collection: 'users',
                id: user.id,
                data: { loginCode: null, loginCodeExpiresAt: null },
              })
              .then(() => {
                return new Response('Error sending email', { status: 500 });
              });
          }
        } catch (error) {
          console.error(error);
          result = new Response('Unexpected error', { status: 500 });
        }

        return result;
      },
    },
    {
      path: '/login/code/validate',
      method: 'post',
      handler: async (req) => {
        const { payload } = req;
        const body = await req.json?.();
        const { code } = body as unknown as { email: string; code: string };

        const user = await payload
          .find({
            collection: 'users',
            where: {
              loginCode: {
                equals: code,
              },
            },
          })
          .then((user) => {
            return user.docs[0];
          });

        if (!user || !user.loginCodeExpiresAt) {
          return new Response('Invalid code', { status: 400 });
        }

        if (isBefore(new Date(user.loginCodeExpiresAt), new Date())) {
          return new Response('Code expired', { status: 400 });
        }

        const collection = await payload.collections.users;
        const collectionConfig = collection.config;

        const authUser = sanitizeInternalFields(
          user as unknown as User & { collection: 'users'; [k: string]: unknown },
        );
        const fieldsToSign = getFieldsToSign({
          collectionConfig,
          email: user.email,
          user: authUser,
        });

        if (collectionConfig.hooks?.beforeLogin?.length) {
          for (const hook of collectionConfig.hooks.beforeLogin) {
            await hook({
              collection: collectionConfig,
              context: req.context,
              req,
              user,
            });
          }
        }

        const { exp, token } = await jwtSign({
          fieldsToSign,
          secret: payload.secret,
          tokenExpiration: collectionConfig.auth.tokenExpiration,
        });

        const result = {
          exp,
          token,
          user: authUser,
        };

        const cookie = generatePayloadCookie({
          collectionAuthConfig: collection.config.auth,
          cookiePrefix: payload.config.cookiePrefix,
          token: result.token,
        });

        await payload.update({
          collection: 'users',
          id: user.id,
          data: { loginCode: null, loginCodeExpiresAt: null },
        });

        return new Response('Login successful', { status: 200, headers: { 'Set-Cookie': cookie } });
      },
    },
    {
      path: '/email/:email',
      method: 'get',
      handler: async (req) => {
        const { payload } = req;
        // Extract email from URL params
        const email = (req as any).params?.email;

        if (!email) {
          return Response.json(
            { error: 'EMAIL_REQUIRED', message: 'Email parameter is required' },
            { status: 400 },
          );
        }

        const result = await payload.find({
          collection: 'users',
          where: {
            email: { equals: email },
          },
        });

        if (result.docs.length === 0) {
          return Response.json(
            { error: 'USER_NOT_FOUND', message: 'User not found with this email' },
            { status: 404 },
          );
        }

        return Response.json(result.docs[0]);
      },
    },
  ],
};
