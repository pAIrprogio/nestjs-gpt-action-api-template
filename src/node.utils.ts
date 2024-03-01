import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const urlToDirname = (url: string) => dirname(fileURLToPath(url));
