import React from 'react';
import ReactDOM from 'react-dom';

class NavNotifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick(e) {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(e.target)) {
            this.setState({
                showMenu: false
            });
        }
    }

    render() {
        const feature = (
            <div className="nav-feature">
                <i className="fas fa-tools"></i>
                <span>Notifications is currently under development.</span>
            </div>
        )

        return (
            <div className="nav-construction">
                <li className="nav-notifications" onClick={e => this.setState({ showMenu: !this.state.showMenu })}>
                    <i className="far fa-bell"></i>
                    <span>Notifications</span>
                </li>
                    {this.state.showMenu ? feature : null}

            </div>
        )
    }
}

export default NavNotifications;