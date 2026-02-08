import type { GlideString } from '@valkey/valkey-glide';

/**
 * Helper to convert GlideString (string | Buffer | Uint8Array) to string
 */
export const glideStringToString = (value: GlideString | null): string | null => {
  if (value === null) return null;
  if (typeof value === 'string') return value;
  if (Buffer.isBuffer(value)) return value.toString('utf-8');
  // Handle Uint8Array case
  return Buffer.from(value).toString('utf-8');
};
