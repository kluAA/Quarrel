const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DislikeSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "comment"
	}
});

module.exports = mongoose.model("dislike", DislikeSchema);