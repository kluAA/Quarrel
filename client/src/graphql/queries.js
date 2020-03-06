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
					comments {
						_id
						comment
						user {
							_id
							fname
							lname
							profileUrl
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
	FETCH_ANSWERS: gql`
      query FetchAnswers {
        answers {
          _id
          body
          user {
            email
          }
        }
      }
    `,
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