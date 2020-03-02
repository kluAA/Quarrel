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
    .then(god => god[type])
    .catch(err => null)
};

// TopicSchema.statics.addQuestion = (topicId, questionId) => {
//   const Topic = mongoose.model("topic");

//   return Topic.findById(topicId).then(topic => {
//     topic.questions.push(questionId);
//     // question.topic.push(topic);

//     return Promise.all([topic.save(), question.save()]).then(
//       ([topic, question]) => topic
//     );
//   });
// };
module.exports = mongoose.model("topic", TopicSchema);