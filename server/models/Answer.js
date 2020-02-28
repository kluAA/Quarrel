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
});

module.exports = mongoose.model("answer", AnswerSchema);