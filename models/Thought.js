const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');

// subdocument Schema for ThoughtSchema
const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		ReactionBody: {
			type: String,
			required: true,
			maxLength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => date(createdAtVal),
		},
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: True,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(cratedAtVal),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
	}
);

// Virutal for retriving reactionCount
ThoughtSchema.virtual('ractionCount').get(function () {
	return this.replies.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
