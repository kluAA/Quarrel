# Quarrel
Quarrel is a question-and-answer web application inspired by the website Quora. It contains full authentication features where you can sign up, log in with your credentials, ask questions, search questions by topics, answer other user's questions, upvote answers and comment on them.

## Demo
Live demo: http://quarrel-pro.herokuapp.com/

## Technologies used
Quarrel's back-end is built on [MongoDB](https://www.mongodb.com/) and [Express](https://expressjs.com/). The front-end is built with [React](https://reactjs.org/), [GraphQL](https://graphql.org/) to handle API requests, [Node.js](https://nodejs.org/) served as the runtime environment, and finally the app is containerized using [Docker](https://www.docker.com/).

## Site
### Landing Page
<img width="1440" alt="quarrel_splash" src="https://user-images.githubusercontent.com/19655779/78736956-3ccaae00-7903-11ea-8f6f-f0447744c522.png">

### Questions
<img width="1440" alt="quarrel_questions" src="https://user-images.githubusercontent.com/19655779/78737122-a0ed7200-7903-11ea-9e0d-e4e9668b6549.png">

### Answers
<img width="1440" alt="quarrel_answers" src="https://user-images.githubusercontent.com/19655779/78737348-2d983000-7904-11ea-9b36-146e5df705e7.png">

### Topics
<img width="1440" alt="quarrel_topics" src="https://user-images.githubusercontent.com/19655779/78737447-57e9ed80-7904-11ea-995a-fb3e5155ee1b.png">

Upon creating a question, users are prompted to assign a "Topic" to that question.
Topics are optional but when used allow other users to find that question via the
topic show page. There are many ways to access the topic show page, including
the topics sidebar on the users home page, the topics link in the header or by
clicking on the topic name above the question. 

Topics are also editable. A user can add/remove topics from questions they asked.
If a user has asked a question, they will see a small pencil next to the topics list
in the quesiton show page.

A user can also follow a topic.

The desire for the topics feature was to main the philosophy of DRY coding. Many 
components were reused using different graphql queries. For example,
The TopicsShow page and the Topic Questions page both use the Topic Header.
The Topic Questions page queries for topic information using 
a Fetch All Topics Query while Topic grabs the data by using another query 
passing in the available topic name from the URL.

The Topic Question also reused the Question Show component. Initially this presented
some challenges with styling and proper links but was accomplished with a 
prop called "fromTopicQuestion" with a value of True. Inside of the question show
we could conditionally check to see if this was a feed item "Question Show"
component or being reused by the Topic Question Component.
### Comments
<img width="1440" alt="quarrel_comments" src="https://user-images.githubusercontent.com/19655779/78737725-1443b380-7905-11ea-9646-9316e5c0be01.png">
