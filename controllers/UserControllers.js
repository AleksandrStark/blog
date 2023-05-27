import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: hash,
		});

		const user = await doc.save();
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'failed to register',
		});
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).json({
				message: 'User was not found',
			});
		}
		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		);

		if (!isValidPass) {
			return res.status(400).json({
				message: 'wrong login or password',
			});
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({
			...userData,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'failed to login',
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		console.log(req.userId);
		if (!user) {
			return res.status(404).json({
				message: 'user was not found',
			});
		}
		const { passwordHash, ...userData } = user._doc;
		res.json(userData);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'no access',
		});
	}
};
