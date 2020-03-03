import React from 'react';
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {},
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.demoLogin = this.demoLogin.bind(this);
	}

	update(field) {
		return e => this.setState({ [field]: e.target.value });
	}

	updateCache(client, { data }) {
		console.log(data);
		client.writeData({
			data: { isLoggedIn: data.login.loggedIn }
		});
	}

	handleSubmit(e, loginUser) {
		e.preventDefault();
		loginUser({
			variables: {
				email: this.state.email,
				password: this.state.password
			}
		}).catch(err => console.log(err));
	}

	// demoLogin(loginUser) {

	// }

	render() {
		return (
			<Mutation
				mutation={LOGIN_USER}
				onCompleted={data => {
					const { token } = data.login;
					localStorage.setItem("auth-token", token);
					this.props.history.push("/");
				}}
				update={(client, data) => this.updateCache(client, data)}
			>
				{loginUser => (
					<div className="login-form-box">
						<label className="session-label">Login</label>
						<form
							className="login-form"
							onSubmit={e => this.handleSubmit(e, loginUser)}
						>
							<div className="form_column">
								<input
									className="text_box"
									value={this.state.email}
									onChange={this.update("email")}
									placeholder="Email"
								/>
							</div>
							<div className="form_column">
							<input
								className="text_box"
								value={this.state.password}
								onChange={this.update("password")}
								type="password"
								placeholder="Password"
								/>
								</div>
							<button type="submit" className="form-button">
								Login
							</button>
							<button
								onClick={e => this.handleSubmit(e, loginUser)}
								className="demo-button"
							>
								Demo Login
							</button>
						</form>
					</div>
				)}
			</Mutation>
		);
	}
}

export default Login;