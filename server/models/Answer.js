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
	upvotesTotal: {
		type: Number
	},
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

AnswerSchema.statics.deleteAnswer = answerId => {
	const Answer = mongoose.model("answer");
	const Upvote = mongoose.model("upvote");
	const Comment = mongoose.model("comment");
	return Answer.findByIdAndDelete(answerId).then(answer => {
		Comment.deleteMany( {answer: answerId}).exec();
		Upvote.deleteMany( {answer: answerId}).exec();
		return answer;
	})

}

module.exports = mongoose.model("answer", AnswerSchema);