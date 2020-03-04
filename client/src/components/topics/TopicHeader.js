import React from "react";
import { Link, withRouter } from "react-router-dom"
import { Mutation } from "react-apollo"
import Mutations from "../../graphql/mutations"
import Queries from "../../graphql/queries"
const { FOLLOW_TOPIC } = Mutations
const { FETCH_TOPICS } = Queries

class TopicHeader extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      message: ""
    }
  }
  updateCache(cache, { data }) {

    const followers = cache.readQuery({ query: FETCH_TOPICS })
    // let topics;
    // try {
    //   topics = cache.readQuery({ query: FETCH_TOPICS });
    // } catch (err) {
    //   return;
    // }
    // if (topics) {
    //   let topicsArray = topics.topics;
    //   let newTopic = data.newTopic;
    //   cache.writeQuery({
    //     query: FETCH_TOPICS,
    //     data: { topics: topicsArray.concat(newTopic) }
    //   });
    // }
  }

  handleClick(e, followTopic) {
    console.log("handleClick")
    e.preventDefault()
    followTopic({ variables: { topicId: this.props.topic._id } })
  }
  render() {
    return (
      <div className="TopicPageHeader" >
        <div className="TopicPageHeader-Top flex">
          <div className="photo-container">
            <div className="TopicPhoto">
              <div className="topic_photo_img">
                <Link to="/topic/Technology">
                  <div className="icon-background">
                    <div className="icon">
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="topic-content">
            <div className="TopicName">
              <h1>{this.props.topic.name}</h1>
            </div>
            <div>
              <div className="icon_action_bar">
                <div className="icon_action_bar-inner flex">
                  <div className="topic_item follow-icon">
                    <span>
                      <Mutation
                        mutation={FOLLOW_TOPIC}
                        update={this.updateCache}
                        onError={err => this.setState({ message: err.message })}
                        update={(cache, data) => this.updateCache(cache, data)}
                        onCompleted={data => {
                          console.log("success")
                        }}
                      >
                        {(followTopic) => (<a className="ui_button" href="#">
                          <div className="ui_button-inner flex">
                            <div className="ui_button_icon_wrapper" onClick={(e) => this.handleClick(e, followTopic)}>
                              <div id="follow-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <g className="icon_svg-stroke" stroke="#329bff" stroke-width="1.5" fill="none" fill-rule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13.5 19.5h-6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v6M8 12.5v-4h4v4H8zM14.5 9H16h-1.5zm0 3H16h-1.5zM8 15.5h8-8zm9 4h5M19.5 17v5"></path>
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <div className="ui_button_count_wrapper">
                              <span className="ui_button_label">Follow</span>
                              <span className="ui_button_count">
                                <span className="bullet">.</span>
                                <span className="ui_button_count_inner">{this.props.topic.followers ? this.props.topic.followers.length : 0}</span>
                              </span>
                            </div>
                          </div>
                        </a>)}
                      </Mutation>
                    </span>
                  </div>
                  <div className="topic_item bookmark">
                    <span>
                      <a className="ui_button-inner">
                        <div className="ui_button_icon_wrapper flex">
                          <div id="bookmark-icon">
                            <span className="ui_button_icon">
                              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="bookmark" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill="none" stroke-width="1.5" fill-rule="evenodd" stroke-linejoin="round">
                                  <polygon points="12.0014329 15 5.50286589 20 5.5 5 18.5 5 18.5 20"></polygon>
                                </g>
                              </svg>
                            </span>
                          </div>
                          <div className="ui_button_label">
                            <span className="ui_button_label">Bookmark</span>
                          </div>
                        </div>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default withRouter(TopicHeader);