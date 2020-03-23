const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpvoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: "answer"
    }
});

module.exports = mongoose.model("upvote", UpvoteSchema);