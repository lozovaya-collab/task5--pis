import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import reqIp from 'request-ip';

import { counterDB } from './db';
import { create, fill } from './db/utils';

dotenv.config();

create()
	.then(() => fill())
	.catch((err) => {
		console.error(err);
	});

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
	const counter = await counterDB.getCounter();

	if (counter) {
		res.send(counter.value.toString());
	} else {
		res.sendStatus(500);
	}
});
app.get('/stat', async (req: Request, res: Response) => {
	const counter = await counterDB.updateCounter(
		req.headers['user-agent']
	);

	if (counter) {
		res.send(counter.value.toString());
	} else {
		res.sendStatus(500);
	}
});

app.get('/about', (req: Request, res: Response) => {
	res.send(
		`<h3>Hello!</h3>
		<br/>
		remoteAddress: <b>${req.socket.remoteAddress}</b>
		<br/>
		hostname: <b>${req.hostname}</b>
		<br/>
		<a href="https://github.com/pbojinov/request-ip" target="_blank">request-ip</a>: <b>${reqIp.getClientIp(
			req
		)}</b>
		<br/>`
	);
});

app.listen(process.env.PORT, () => {
	console.log(
		`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
	);
});
