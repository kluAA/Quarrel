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
			errors: {}
		};
		this.renderErrors = this.renderErrors.bind(this);
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

	handleSubmit(e) {
		e.preventDefault();
		let user = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.signup(user, this.props.history);
		// .then(this.props.history.push("/"),
		// () => this.props.closeModal());
	}

	renderErrors() {
		return (
			<ul>
				{Object.keys(this.state.errors).map((error, i) => (
					<li key={`error-${i}`}>{this.state.errors[error]}</li>
				))}
			</ul>
		);
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
					<div>
						<form
							onSubmit={e => {
								e.preventDefault();
								registerUser({
									variables: {
										fname: this.state.fname,
										lname: this.state.lname,
										email: this.state.email,
										password: this.state.password
									}
								}).catch(err => console.log(err));
							}}
						>
							<label>
								FIRST NAME
								<input
									value={this.state.fname}
									onChange={this.update("fname")}
									// placeholder="First Name"
								/>
							</label>
							<br />
							<label>
								LAST NAME
								<input
									value={this.state.lname}
									onChange={this.update("lname")}
									// placeholder="Last Name"
								/>
							</label>
							<br />
							<label>
								EMAIL
								<input
									value={this.state.email}
									onChange={this.update("email")}
									// placeholder="Email"
								/>
							</label>
							<br />
							<label>
								PASSWORD
								<input
									value={this.state.password}
									onChange={this.update("password")}
									type="password"
									// placeholder="Password"
								/>
							</label>
							<br />
							{this.renderErrors()}
							<button type="submit">Sign Up</button>
						</form>
					</div>
				)}
			</Mutation>
		);
	}
}

export default Register;