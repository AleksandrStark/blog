import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find();
		res.json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'failed to get an article',
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.title,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		});
		const post = await doc.save();
		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'failed to create an article',
		});
	}
};
