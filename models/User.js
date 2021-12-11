const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: Sring,
		unique: true,
		required: 'Username is Required',
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		match: [/.+@.+\..+/],
	},
	userCreated: {
		type: Date,
		default: Date.now,
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Thought',
		},
	],
});

const User = model('User', UserSchema);

module.exports = User;
