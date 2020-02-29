const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const mongoose = require("mongoose");
const Answer = mongoose.model("answer");

const AnswerType = new GraphQLObjectType({
  name: "AnswerType",
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
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
    }
  })
});

module.exports = AnswerType;
