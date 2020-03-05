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
const Upvote = mongoose.model("upvote");

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
            async resolve(_, { question, link }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    console.log(validUser);
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
            },
            async resolve(_, { body, questionId }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    return new Answer({ body, user: validUser._id, question: questionId }).save()
                        .then(answer => {
                            Question.findByIdAndUpdate(questionId, { $push: { answers: answer._id } }).exec();
                            return answer;
                        })
                } else {
                    // throw new Error("Must be logged in to create an answer")
                    return new Answer({ body, user: validUser._id, question: questionId }).save()
                        .then(answer => {
                            Question.findByIdAndUpdate(questionId, { $push: { answers: answer._id } }).exec();
                            return answer;
                        })
                }
            }
        },
        newTopic: {
            type: TopicType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                imageUrl: { type: GraphQLString },
            },
            async resolve(_, { name, description, imageUrl }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    return new Topic({ name, description, imageUrl }).save()
                } else {
                    // throw new Error("Must be logged in to create an answer")
                    return new Topic({ name, description, imageUrl }).save()
                }
            }
        },
        addTopicToUser: {
            type: TopicType,
            args: {
                topicId: { type: GraphQLID }
            },
            async resolve(parentValue, { topicId }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                return Topic.addUser(topicId, validUser._id).then(
                    User.addTopic(topicId, validUser._id)
                )
            }
        },
        updateProfileUrl: {
            type: UserType,
            args: {
                profileUrl: { type: GraphQLString }
            },
            async resolve(parentValue, { profileUrl }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                if (validUser.loggedIn) {
                    return User.findByIdAndUpdate(validUser._id, { profileUrl }).exec();
                } else {
                    throw new Error("Must be logged in to upload!")
                }
            }
        },
        upvoteAnswer: {
            type: AnswerType,
            args: {
                answerId: { type: GraphQLID },
            },
            async resolve(parentValue, { answerId }, ctx) {
                const validUser = await AuthService.verifyUser({ token: ctx.token });
                return new Upvote({ user: validUser._id, answer: answerId }).save()
                    .then(upvote => {
                        return Answer.findByIdAndUpdate(answerId, { $push: { upvotes: upvote._id } }).exec();
                    })
            }
        }
    }
});

module.exports = mutation;