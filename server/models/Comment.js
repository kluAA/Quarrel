const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "question"
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: "answer"
    },
    comment: {
        type: String,
        required: false
		},
		date: {
			type: Date,
			required: true
		},
		dislikes: [
			{
				type: Schema.Types.ObjectId,
				ref: "dislike"
			}
		],
});

module.exports = mongoose.model("comment", CommentSchema);