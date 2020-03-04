const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const Follow = mongoose.model("question");

const FollowType = new GraphQLObjectType({
  name: "QuestionType",
  fields: () => ({
    _id: { type: GraphQLID },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return Question.findById(parentValue._id)
          .populate("user")
          .then(question => {
            return question.user
          });
      }
    },
    link: { type: GraphQLString },
    answers: {
      type: require("./answer_type"),
      resolve(parentValue) {
        return Question.findById(parentValue._id)
          .populate("answers")
          .then(question => question.answers)
      }
    }
  })
});

module.exports = QuestionType;