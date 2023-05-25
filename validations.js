import { body } from 'express-validator';

export const loginValidation = [
	body('email', 'wrong email format').isEmail(),
	body('password', 'password should be at least 5 symbols').isLength({
		min: 5,
	}),
];

export const registerValidation = [
	body('email', 'Wrong email format').isEmail(),
	body('password', 'Password should be at least 5 symbols').isLength({
		min: 5,
	}),
	body('fullName', 'Please type your name').isLength({ min: 3 }),
	body('avatarUrl', 'Wrong avatar link').optional().isURL(),
];

export const postCreateValidation = [
	body('title', 'Write the title of the article')
		.isLength({ min: 3 })
		.isString(),
	body('text', 'Write the article').isLength({ min: 10 }).isString(),
	body('tags', 'Wrong tag format(Array is required)').optional().isString(),
	body('imageUrl', 'Incorrect link').optional().isString(),
];
