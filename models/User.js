const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		name: {
			type: String,
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
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Virtual for retriving frinedCount
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
