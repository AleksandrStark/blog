import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'wrong email format').isEmail(),
	body('password', 'password should be at least 5 symbols').isLength({
		min: 5,
	}),
	body('fullName', 'please type your name').isLength({ min: 3 }),
	body('avatarUrl', 'wrong avatar link').optional().isURL(),
];
