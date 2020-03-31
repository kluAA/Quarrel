const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    question: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    link: {
        type: String
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "answer"
        }
    ],
    topics: [
        {
            type: Schema.Types.ObjectId,
            ref: "topic"
        }
    ]
});

QuestionSchema.statics.findMatches = (question) => {
    const Question = mongoose.model("question");
    return Question.find({ question: { $regex: new RegExp(question, 'i') } });
};

QuestionSchema.statics.findRelatedQuestions = (questionId) => {
    const Question = mongoose.model("question");
    return Question.findById(questionId)
        .then(foundQuestion => {
            const longestWord = findLongestWord(foundQuestion.question);
            const secondLongestWord = findSecondLongestWord(foundQuestion.question);
            return Question.find({ question: { $regex: new RegExp(`${longestWord}|${secondLongestWord}`, 'i') } })
        });
}

QuestionSchema.statics.addTopic = (questionId, topicId) => {
    const Question = mongoose.model("question");

    return Question.findById(questionId).then(question => {
        question.topics.push(topicId);

        return question.save()
    });
};

QuestionSchema.statics.addTopics = (questionId, topics) => {
    const Question = mongoose.model("question");

    return Question.findById(questionId).then(question => {
        //access old topics that will be removed
        let topicsForRemoval = question.topics.filter(topic => !topics.includes(topic))
        topicsForRemoval.forEach(topicId => {
            let topic = findBy(topicId)
            topic.questions.deleteOne( {"_id": ObjectId(question._id)});
        })
        //iterate through array, findbyTopicById then use pull to pull questionId from the questions array.
        question.topics = topics;

        return question.save()
    });
};
const findLongestWord = (sentence) => {
    let words = sentence.slice(0, -1).split(" ");
    let longestWord = words[0];
    for (i = 0; i < words.length; i++) {
        let currentWord = words[i];
        if (currentWord.length > longestWord.length) {
            longestWord = currentWord;
        }
    }
    return longestWord;
};

const findSecondLongestWord = (sentence) => {
    let words = sentence.slice(0, -1).split(" ");
    let longestWord = words[0];
    let secondLongest = words[1];
    for (i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            secondLongest = longestWord;
            longestWord = words[i];
        } else if (words[i] !== longestWord && words[i].length > secondLongest.length) {
            secondLongest = words[i];
        }
    }
    return secondLongest;
};

module.exports = mongoose.model("question", QuestionSchema);