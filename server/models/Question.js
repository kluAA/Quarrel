const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    question: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "answer"
        }
    ]
});

QuestionSchema.statics.findMatches = (question) => {
    const Question = mongoose.model("question");
    return Question.find({ question: { $regex: new RegExp(question, 'i') } })
}

module.exports = mongoose.model("question", QuestionSchema);