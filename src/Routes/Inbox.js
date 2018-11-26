import React, { Component } from 'react';

import Comment from '../Components/Comment/Comment'

class Inbox extends Component {
  render() {
    return(
      <div>
      <header>
        <h1>Inbox</h1>
      </header>
      {
        this.state.showComments &&
        this.state.comments.map(comment =>
          <Comment
            key={comment.key}
            title={comment.title}
            issue_num={comment.issue_num}
            timestamp={comment.timestamp}
            op={'Dan'}
            op_img={comment.img}
            body={comment.body}
          />
        )
      }
      </div>
    )
  }
}

export default Inbox
