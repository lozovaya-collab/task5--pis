import type { PoolConfig } from 'pg';
import { Pool } from 'pg';

import { db } from '../../config';

export function getPool(config: PoolConfig = db): Pool{
	let pool: Pool | null = null;

	if (!pool)
		pool = new Pool({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password
		});

	return pool;
};

export async function getCounter() {
	const pool = getPool();

	try {
		const {
			rows: { 0: counter },
		} = await pool.query(
			`select 
                value
            from
                counter`
		);

		return counter;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export async function updateCounter(userInfo: string | undefined) {
	const pool = getPool();
	
	const client = await pool.connect();
	await client.query('begin');

	try {
		const {
			rows: { 0: counter },
		} = await client.query(
			`update counter
            set
                value = value + 1
            returning *`
		);

		await client.query(
			`insert into
                counter_info (client_info)
            values
                ($1)`,
			[userInfo || 'none']
		);

		await client.query('commit');
		client.release();

		return counter;
	} catch (err) {
		await client.query('rollback');
		client.release();

		console.error(err);
		return null;
	}
};


