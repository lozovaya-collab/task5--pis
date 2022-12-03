// import chalk from 'chalk';
import { readFileSync } from 'fs';

import { db } from '../../config';
import { getPool } from './counter';

export const create = () => {
	return new Promise((res, rej) => {
		try {
			const pool = getPool({
				...db,
				database: undefined,
			});

			const createSql = readFileSync('./sql/create.sql', {
				encoding: 'utf-8',
			});

			pool.connect()
				.then((result) =>
					result.query(createSql).then(() => {
						// console.log(chalk.green('Success'));
						res(true);
					})
				)
				.catch((err) => {
					// console.log(chalk.red('Error'));
					rej(err);
				});
			
		} catch (error) {
			rej(error);
		}
	});
};

export const fill = () => {
	return new Promise((res, rej) => {
		try {
			const pool = getPool({
				...db,
			});

			const fillScript = readFileSync('./sql/fill.sql', {
				encoding: 'utf-8',
			});

			pool.connect()
				.then((client) =>
					client.query(fillScript).then(() => {
						// console.log(chalk.green('Success'));
						res(true);
					})
				)
				.catch((err) => {
					// console.log(chalk.red('ERROR!'));
					rej(err);
				});
		} catch (error) {
			rej(error);
		}
	});
};