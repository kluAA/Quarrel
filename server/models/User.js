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
		comments: {
			type: Schema.Types.ObjectId,
			ref: "comment"
		}
});

module.exports = mongoose.model("user", UserSchema);