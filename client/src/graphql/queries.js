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
          date
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
          date
          answers {
            _id
            body
            date
            user {
              _id
              fname
              lname
              profileUrl
            }
            question {
              _id
            }
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
          profileUrl
          topics {
            _id
            name
          }
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
          imageUrl
          followers {
            _id
          }
        }
      }
    `,
  FETCH_TOPIC_BY_NAME: gql`
      query FetchTopic($name: String!) {
        topic_by_name(name: $name) {
          _id
          name
          imageUrl
          followers {
            _id
          }
        }
      }
    `,
  //A query to fetch topic by ID instead of name
  FETCH_TOPIC: gql`
      query FetchTopic($id: ID!) {
        topic(_id: $ID) {
          _id
          name
          imageUrl
          followers {
            _id
          }
        }
      }
    `,
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
    `,
  SEARCH_TOPICS: gql`
      query SearchTopics($query: String) {
        searchTopics(query: $query) {
          _id
          name
          imageUrl
        }
      }
    `
};