const { Thought } = require('../models');

const thoughtController = {
	// Get All Thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// Get Thoughts by Id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.select('-__v')
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.status(400).json(err));
	},

	// Adds thought
	addThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId }, //
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'Invalid User' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					return res.status(404).json({ message: 'Thought not found' });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'Thought not found' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: 'Thought not found' });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},

	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
