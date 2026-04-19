import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('No database URL environment variable is set');
}

export const client = postgres(dbUrl, { ssl: 'require' });
export const db = drizzle(client, { schema });
