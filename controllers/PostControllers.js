import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec();
		res.json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'failed to get an article',
		});
	}
};

export const getOne = (req, res) => {
	const postId = req.params.id;

	PostModel.findOneAndUpdate(
		{
			_id: postId,
		},
		{
			$inc: {
				viewsCount: 1,
			},
		},
		{
			returnDocument: 'after',
		}
	)
		.then((doc) => {
			if (!doc) {
				return res.status(404).json({
					message: 'failed to find an article',
				});
			}
			res.json(doc);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: 'failed to get an article',
			});
		});
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
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

export const remove = (req, res) => {
	const postId = req.params.id;

	PostModel.findOneAndDelete({
		_id: postId,
	})
		.then((doc) => {
			if (!doc) {
				return res.status(404).json({
					message: 'failed to find an article',
				});
			}
			res.json({
				success: true,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: 'failed to delete an article',
			});
		});
};

export const update = async (req, res) => {
	const postId = req.params.id;

	PostModel.updateOne(
		{
			_id: postId,
		},
		{
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		}
	)
		.then((doc) => {
			if (!doc) {
				return res.status(404).json({
					message: 'failed to find an article',
				});
			}
			res.json({
				success: true,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				message: 'failed to update an article',
			});
		});
};
