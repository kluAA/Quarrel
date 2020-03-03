import React from "react";
import TopicHeader from "./TopicHeader.js"


class TopicShow extends React.Component {
  constructor(props) {
    super(props);

    // since we know we'll be receiving the god's name through props
    // we can set it in our state
    this.state = {
      name: this.props.name || ""
    };
  }

  render() {
    return (
      <TopicHeader />
    );
  }
}

export default TopicShow;