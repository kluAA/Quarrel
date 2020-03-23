const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentUpvoteSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "comment"
	}
});

module.exports = mongoose.model("commentupvote", CommentUpvoteSchema);