import type { PoolConfig } from 'pg';

export const db: PoolConfig = {
	host: 'postgres',
	port: 5432,
	user: 'postgres',
	password: 'postgres',
	database: 'db-pis',
};
