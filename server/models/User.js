const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);


const UserSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 32
    },
    profileUrl: {
        type: String
    },
    topics: [
        {
            type: Schema.Types.ObjectId,
            ref: "topic"
        }
    ],
    trackedQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: "question"
        }
    ]
});

UserSchema.statics.addTopic = (topicId, userId) => {
    const User = mongoose.model("user");

    return User.findById(userId).then(user => {
        if (!user.topics.includes(topicId)) {
            user.topics.push(topicId)
            return user.save();
        } else {
            user.topics.pull(topicId)
            return user.save();
        }
    });
};

UserSchema.statics.trackQuestion = (questionId, userId) => {
    const User = mongoose.model("user");
    return User.findById(userId).then(user => {
        if (!user.trackedQuestions.includes(questionId)) {
            user.trackedQuestions.push(questionId);
            return user.save();
        } else {
            user.trackedQuestions.pull(questionId);
            return user.save();
        }
    });
}
module.exports = mongoose.model("user", UserSchema);