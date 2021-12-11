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
};

module.exports = userController;
