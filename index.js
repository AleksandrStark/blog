import express from 'express';

import mongoose from 'mongoose';

import {
	registerValidation,
	loginValidation,
	postCreateValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserControllers.js';
import * as PostController from './controllers/PostControllers.js';

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

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// app.get('/posts',PostController.getAll);
// app.get('/posts/:id',PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts',PostController.remove);
// app.patch('/posts',PostController.update);

app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
