import React, { Component } from 'react';
import './Comment.scss'

const ReactMarkdown = require('react-markdown')

class Comment extends Component {
  render() {
    return(
      <div id='comment'>
        <div className='title-bar'>
          <input type='checkbox' />
          <h4 className='issue-title'>{this.props.op}</h4>
          <span className='issue-num'>#{this.props.issue_num}</span>
          <span className='timestamp'>{this.props.timestamp}d</span>
        </div>
        <div className='comment'>
          <img src={this.props.op_img} className='avatar' alt='User Profile' />
          <ReactMarkdown source={this.props.body} className='comment-body' />
        </div>
      </div>
    )
  }
}

export default Comment
