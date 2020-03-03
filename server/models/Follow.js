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