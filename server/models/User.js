const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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
    topics: {
        type: Schema.Types.ObjectId,
        ref: "topic"
    },
    profileUrl: {
        type: String
    }
});
UserSchema.statics.addTopic = (topicId, userId) => {
    const User = mongoose.model("user");

    return User.findById(userId).then(user => {
        user.topics.push(topicId);
        return user.save()
    });
};
module.exports = mongoose.model("user", UserSchema);