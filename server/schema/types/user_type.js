const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        _id: { type: GraphQLID },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
				loggedIn: { type: GraphQLBoolean },
				errors: { type: new GraphQLList(GraphQLString) },

		}),
		comments: {
			type: require("./comment_type"),
			resolve(parentValue)
			{
				return Question.findById(parentValue._id)
					.populate("comments")
					.then(question => question.comments)
			}
		},

});

module.exports = UserType;