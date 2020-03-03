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
    `
};