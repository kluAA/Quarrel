const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const Upvote = mongoose.model("upvote");

const UpvoteType = new GraphQLObjectType({
    name: "UpvoteType",
    fields: () => ({
        _id: { type: GraphQLID },
        user: {
            type: require("./user_type"),
            resolve(parentValue) {
                return Upvote.findById(parentValue._id)
                    .populate("user")
                    .then(upvote => {
                        return upvote.user
                    });
            }
        },
        answer: {
            type: require("./answer_type"),
            resolve(parentValue) {
                return Upvote.findById(parentValue._id)
                    .populate("answer")
                    .then(upvote => upvote.answer)
            }
        }
    })
});

module.exports = UpvoteType;