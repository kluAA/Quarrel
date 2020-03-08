const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Dislike = mongoose.model("dislike");

const DislikeType = new GraphQLObjectType({
	name: "DislikeType",
	fields: () => ({
		_id: { type: GraphQLID },
		user: {
			type: require("./user_type"),
			resolve(parentValue) {
				return Dislike.findById(parentValue._id)
					.populate("user")
					.then(dislike => {
						return dislike.user
					});
			}
		},
		comment: {
			type: require("./comment_type"),
			resolve(parentValue) {
				return Dislike.findById(parentValue._id)
					.populate("comment")
					.then(dislike => dislike.comment)
			}
		}
	})
});

module.exports = DislikeType;