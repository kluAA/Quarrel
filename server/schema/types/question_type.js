const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const Question = mongoose.model("question");

const QuestionType = new GraphQLObjectType({
    name: "QuestionType",
    fields: () => ({
        _id: { type: GraphQLID },
        question: { type: GraphQLString },
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
				},
			comments: {
				type: require("./comment_type"),
				resolve(parentValue)
				{
					return Question.findById(parentValue._id)
						.populate("comments")
						.then(question => question.comments)
				}
			}
    })
});

module.exports = QuestionType;