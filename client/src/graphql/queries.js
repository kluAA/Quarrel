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
  FETCH_QUESTION: gql`
      query FetchQuestion($id: ID!) {
        question(_id: $id) {
          _id
          question
          answers {
            _id
						body
					}
        }
      }
    `,
  CURRENT_USER: gql`
      query CurrentUser($token: String!) {
        currentUser(token: $token) {
          _id
          fname
          lname
          email
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
  FETCH_TOPICS: gql`
     query FetchTopics {
        topics{
          _id
          name
          followers {
            _id
<<<<<<< HEAD
          }
        }
      }
		`,
	FETCH_ANSWERS: gql`
      query FetchAnswers {
        answers {
          _id
          body
          user {
            email
=======
>>>>>>> b762e49057337ed7a709fb3940fc00b5627769b9
          }
        }
      }
    `,
<<<<<<< HEAD
	FETCH_ANSWER: gql`
      query FetchAnswer($id: ID!) {
        answer(_id: $id) {
          _id
					body
					question {
						_id
						question
					}
          comments {
            _id
            comment
          }
        }
      }
		`,
		FETCH_COMMENTS: gql`
      query FetchComments {
        comments {
          _id
          comment
          user {
            email
					}
					answer {
						_id
						body
					}
        }
      }
    `,
	FETCH_COMMENT: gql`
      query FetchComment($id: ID!) {
        comment(_id: $id) {
          _id
          comment
          answer {
            _id
            body
					}
					user {
						email
					}
        }
      }
    `,
=======
>>>>>>> b762e49057337ed7a709fb3940fc00b5627769b9
    RELATED_QUESTIONS: gql`
      query RelatedQuestions($questionId: ID!) {
        relatedQuestions(questionId: $questionId) {
          _id
          question
          answers {
            _id
          }
        } 
      }
    `
};