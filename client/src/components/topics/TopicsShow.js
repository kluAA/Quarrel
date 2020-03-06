import React from "react";
import TopicHeader from "./TopicHeader"
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_TOPICS } = Queries;

class TopicsShow extends React.Component {

  render() {

    return (
      < div >
        <Query
          query={FETCH_TOPICS}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              data.topics.map(topic => {
                return <TopicHeader key={topic._id} topic={topic} name={topic.name} />
              })
            )
          }}

        </Query>

      </div >
    );
  }
}

export default TopicsShow;