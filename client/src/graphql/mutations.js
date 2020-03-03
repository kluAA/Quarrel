import gql from "graphql-tag";

export default {
    REGISTER_USER: gql`
        mutation RegisterUser($fname: String!, $lname: String! $email: String!, $password: String!) {
            register(fname: $fname, lname: $lname, email: $email, password: $password) {
								email
								token
                loggedIn
            }
        }
    `,
    LOGIN_USER: gql`
        mutation LoginUser($email: String!, $password: String!) {
            login(email: $email, password: $password) {
						email
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