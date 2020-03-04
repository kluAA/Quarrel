const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "question"
    }
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "answer"
    }
  ]
});


TopicSchema.statics.findData = function (topicId, type) {
  return this.findById(topicId)
    .populate(`${type}`)
    .then(topic => topic[type])
    .catch(err => null)
};

TopicSchema.statics.addUser = (topicId, userId) => {
  const Topic = mongoose.model("topic");

  return Topic.findById(topicId).then(topic => {
    topic.followers.push(userId);
    return topic.save()
  });
};
module.exports = mongoose.model("topic", TopicSchema);