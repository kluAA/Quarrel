import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Login from "./Login";
import Register from "./Register";

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="background-container">
				<div className="session-form-container">
					<label className="main-logo">Quarrel</label>
					<p className="tag-description">come fight</p>
					<div className="form-container">
						<div className="signup-form-container">
							<Register />
						</div>
						<div className="login-form-container">
							<Login />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SessionForm;