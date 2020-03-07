const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	question: {
		type: Schema.Types.ObjectId,
		ref: "question"
	},
	body: {
		type: String,
		required: true
	},
	upvotes: [
		{
			type: Schema.Types.ObjectId,
			ref: "upvote"
		}
	],
	date: {
		type: Date,
		required: true
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "comment"
		}
	]
});

module.exports = mongoose.model("answer", AnswerSchema);