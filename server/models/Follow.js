const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "topic"
    }
  ],
});


TopicSchema.statics.findData = function (topicId, type) {
  return this.findById(topicId)
    .populate(`${type}`)
    .then(god => god[type])
    .catch(err => null)
};