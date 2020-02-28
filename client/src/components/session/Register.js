import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from "../../graphql/mutations";
const { REGISTER_USER } = Mutations;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: ""
        }
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        console.log(data);
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn }
        });
    }

    render() {
        return (
            <Mutation
                mutation={REGISTER_USER}
                onCompleted={data => {
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                {registerUser => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                registerUser({
                                    variables: {
                                        name: this.state.name,
                                        username: this.state.username,
                                        email: this.state.email,
                                        password: this.state.password
                                    }
                                }).catch(err => console.log(err));
                            }}
                        >
                            <input
                                value={this.state.name}
                                onChange={this.update("name")}
                                placeholder="Name"
                            />
                            <br />
                            <input
                                value={this.state.username}
                                onChange={this.update("username")}
                                placeholder="Username"
                            />
                            <br />
                            <input
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email"
                            />
                            <br />
                            <input
                                value={this.state.password}
                                onChange={this.update("password")}
                                type="password"
                                placeholder="Password"
                            />
                            <br />
                            <button type="submit">Register</button>

                        </form>
                    </div>
                )}

            </Mutation>

        )
    }
}

export default Register;