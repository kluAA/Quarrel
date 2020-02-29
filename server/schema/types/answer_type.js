const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const mongoose = require("mongoose");
const User = mongoose.model("user");

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
        }
  })
});

module.exports = AnswerType;
