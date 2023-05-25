import express from 'express';

import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserControllers from './controllers/UserControllers.js';

mongoose
	.connect(
		'mongodb+srv://starkovaleksandr2384:Alarma888@cluster0.q7t5yqb.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('DB OK');
	})
	.catch((err) => {
		console.log('DB error', err);
	});

const app = express();

app.use(express.json());

app.post('/auth/login', UserControllers.login);

app.post('/auth/register', registerValidation, UserControllers.register);

app.get('/auth/me', checkAuth, UserControllers.getMe);

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
