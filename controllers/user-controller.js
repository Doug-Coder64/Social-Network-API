const { User } = require('../models');

const userController = {
	// Gets all users
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.error(err);
				res.sendStatus(400);
			});
	},

	// Get User by id
	getUsersById({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.error(err);
				res.sendStatus(400);
			});
	},

	// Create a User
	addUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},

	// Update a User
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidator: true,
		}).then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'Invalid User' });
				return;
			}
			res.json(dbUserData);
		});
	},

	// delete a user
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id }).then((dbUserData) => {
			if (!dbUserData) {
				res.status(404).json({ message: 'Invalid User' });
				return;
			}
			res.json(dbUserData);
		});
	},

	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: params.friendId } },
			{ new: true, runValidator: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'Invalid User' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				res.json(err);
			});
	},

	deleteFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $pull: { friends: params.frienddID } },
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				res.json(err);
			});
	},
};

module.exports = userController;
