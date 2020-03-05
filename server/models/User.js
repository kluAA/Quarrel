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
    topics: [
        {
            type: Schema.Types.ObjectId,
            ref: "topic"
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
module.exports = mongoose.model("user", UserSchema);