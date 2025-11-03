import crypto from 'crypto';
export const randomUUID = (): string => {
  return crypto.randomUUID();
};
