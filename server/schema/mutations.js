const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const User = mongoose.model("user");
const TopicType = require("./types/topic_type");
const Topic = mongoose.model("topic");
const QuestionType = require("./types/question_type");
const Question = mongoose.model("question");
const AnswerType = require("./types/answer_type");
const Answer = mongoose.model("answer");
const CommentType = require("./types/comment_type");
const Comment = mongoose.model("comment");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: {
            type: UserType,
            args: {
                fname: { type: GraphQLString },
                lname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.register(args);
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.login(args);
            }
        },
        logout: {
            type: UserType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(_, args) {
                return AuthService.logout(args);
            }
        },
        verifyUser: {
            type: UserType,
            args: {
                token: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthService.verifyUser(args);
            }
        },
        newQuestion: {
            type: QuestionType,
            args: {
                question: { type: GraphQLString },
                link: { type: GraphQLString }
            },
            async resolve(_, { question, link}, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    return new Question({ question, user: validUser._id, link }).save()
                } else {
                    throw new Error("Must be logged in to create a question")
                }
            }
        },
        newAnswer: {
            type: AnswerType,
            args: {
                body: { type: GraphQLString },
                questionId: { type: GraphQLID },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(_, { body }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    return new Answer({body, user: authorId, question: questionId }).save()
                } else {
                    throw new Error("Must be logged in to create an answer")
                }
            }
        },
        newTopic: {
            type: TopicType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            async resolve(_, { name, description }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    return new Topic({ name, description }).save()
                } else {
                    // throw new Error("Must be logged in to create an answer")
                    return new Topic({ name, description }).save()
                }
            }
				},
			newComment: {
				type: CommentType,
				args: {
					comment: { type: GraphQLString },
					questionId: { type: GraphQLID },
					commenterId: { type: new GraphQLNonNull(GraphQLID) },
				},
				async resolve(_, { comment }, ctx)
				{
					const validUser = await AuthService.verifyUser({ token: ctx.token });
					if (validUser.loggedIn) {
						return new Answer({ comment, user: commenterId, question: questionId }).save()
					} else {
						throw new Error("Must be logged in to write a comment")
					}
				}
			},
        // addQuestionToTopic: {
        //     type: TopicType,
        //     args: {
        //         topicId: { type: GraphQLID },
        //         questionId: { type: GraphQLID },
        //     },
        //     resolve(parentValue, { topicId, questionId }) {
        //         return Topic.addQuestion(topicId, questionId);
        //     }
        // }
    }
});

module.exports = mutation;