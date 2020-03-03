import gql from "graphql-tag";

export default {
    IS_LOGGED_IN: gql`
      query isUserLoggedIn {
          isLoggedIn @client
      }
    `,
    FETCH_QUESTIONS: gql`
      {
        questions {
          _id
          question
          user {
            email
          }
        }
      }
    `,
    CURRENT_USER: gql`
      query CurrentUser($token: String!) {
        currentUser(token: $token) {
          currentUserId @client
					curentUserFname @client
					curentUserLname @client
					curentUserEmail @client

        }
      }
    `,
    SIMILAR_QUESTIONS: gql`
      query SimilarQuestions($question: String) {
        similarQuestions(question: $question) {
          _id 
          question
          answers {
            _id
          }
        }
      }
		`,
	ANSWER_COMMENTS: gql`
			query AnswerComments($answer: String) {
			answerComments(answer: $answer) {
				_id
				answer
				comments {
					_id
					comment
					user
				}
			}
		}
	`,
};