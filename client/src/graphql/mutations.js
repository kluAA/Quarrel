import gql from "graphql-tag";

export default {
    REGISTER_USER: gql`
        mutation RegisterUser($name: String!, $username: String! $email: String!, $password: String!) {
            register(name: $name, username: $username, email: $email, password: $password) {
                token
                loggedIn
            }
        }
    `,
    LOGIN_USER: gql`
        mutation LoginUser($username: String!, $password: String!) {
            login(username: $username, password: $password) {
            token
            loggedIn
            }
        }
    `,
    VERIFY_USER: gql`
        mutation VerifyUser($token: String!) {
            verifyUser(token: $token) {
            loggedIn
            }
        }
    `,
    NEW_QUESTION: gql`
        mutation NewQuestion($question: String, $link: String) {
            newQuestion(question: $question, link: $link) {
                _id
                question
                link
                user {
                    name
                }
            }
        }
    `
}