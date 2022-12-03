import type { PoolConfig } from 'pg';

export const db: PoolConfig = {
	host: process.env.DB_HOST || 'localhost',
	port: !isNaN(Number(process.env.DB_PORT))
		? Number(process.env.DB_PORT)
		: 5432,
	user: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'postgres',
	database: process.env.DB_NAME || 'db-pis',
};
