import { createHash } from 'crypto';

export const generateHash = (str: string) => createHash('sha256').update(str).digest('hex');
