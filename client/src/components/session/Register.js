import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from "../../graphql/mutations";
const { REGISTER_USER } = Mutations;

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fname: "",
			lname: "",
			email: "",
			password: "",
			errors: {},
			showModal: false
		};

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

	handleSubmit(e, registerUser) {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		if (email.split("@").length !== 2) {
			this.setState({
				email:
					"Invalid email" +
					"Try again"
			});
		} else {
			registerUser({
				variables: {
					fname: this.state.fname,
					lname: this.state.lname,
					email: this.state.email,
					password: this.state.password
				}
			}).catch(err => console.log(err));
		}
	}

	render() {
		return (
			<Mutation
				mutation={REGISTER_USER}
				onError={err => this.setState({ message: err.message })}
				update={(cache, data) => this.updateCache(cache, data)}
				onCompleted={data => {
					const { token } = data.register;
					localStorage.setItem("auth-token", token);
					this.props.history.push("/");
					const { user } = data.newUser;
					this.setState({
						message: `New user created successfully`
					});
				}}
				update={(client, data) => this.updateCache(client, data)}
			>
				{registerUser => (
					<div className="">
						<form onSubmit={e => this.handleSubmit(e, registerUser)}>
							<p>Login</p>
							<label>
								FIRST NAME
								<input
									type="text"
									value={this.state.fname}
									onChange={this.update("fname")}
									className=""
								/>
							</label>
							<br />
							<label>
								LAST NAME
								<input
									type="text"
									value={this.state.lname}
									onChange={this.update("lname")}
									className=""
								/>
							</label>
							<br />
							<label>
								EMAIL
								<input
									value={this.state.email}
									onChange={this.update("email")}
									className=""
								/>
							</label>
							<br />
							<label>
								PASSWORD
								<input
									value={this.state.password}
									onChange={this.update("password")}
									type="password"
									className=""
								/>
							</label>
							<br />
							<button type="submit" className="">Sign up</button>
						</form>
					</div>
				)}
			</Mutation>
		);
	}
}

export default Register;