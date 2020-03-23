const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } = graphql;

const mongoose = require("mongoose");
const Answer = mongoose.model("answer");
const UpvoteType = require("./upvote_type");
const CommentType = require("./comment_type");

const AnswerType = new GraphQLObjectType({
  name: "AnswerType",
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    date: { type: GraphQLString },
    upvotesTotal: { type: GraphQLInt },
    user: {
            type: require("./user_type"),
            resolve(parentValue) {
                return Answer.findById(parentValue._id)
                    .populate("user")
                    .then(answer => {
                        return answer.user
                    });
            }
        },
    question: {
      type: require("./question_type"),
      resolve(parentValue) {
        return Answer.findById(parentValue._id)
          .populate("question")
          .then(answer=> {
            return answer.question
          });
      }
    },
    upvotes: {
      type: new GraphQLList(UpvoteType),
      resolve(parentValue) {
        return Answer.findById(parentValue.id)
          .populate("upvotes")
          .then(answer => answer.upvotes);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Answer.findById(parentValue._id)
          .populate("comments")
          .then(answer => answer.comments);
      }
    }
  })
});

module.exports = AnswerType;
