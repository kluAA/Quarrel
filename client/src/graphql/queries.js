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
            name
          }
        }
      }
    `,
    CURRENT_USER: gql`
      query CurrentUser($token: String!) {
        currentUser(token: $token) {
          _id
          username
          name
          email
        }
      }
    `
};