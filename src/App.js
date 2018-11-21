import React, { Component } from 'react';
import './App.scss';

// Imports
import queryString from 'query-string'

import Comment from './Components/Comment/Comment'

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: { img: '', name: '' },
      comment: []
    }
  }

  componentDidMount(){
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    let apiURL = 'https://api.github.com'

    // User
    fetch(apiURL + '/user', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json()).then(data => {
      this.setState({
        user: {
          img:    data.avatar_url,
          name:   data.name
        }
      })
    })

    // Comments
    fetch(apiURL + '/repos/seatgeek/product-design/issues/comments?since=2018-11-01T18:54:09+0000', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json()).then(data => {

      // Map comments and create lets for each data point
      data.map(data => {

        // Get Issue Numbers
        let unNum = data.issue_url
        let trimNum = unNum.substr(unNum.length - 3)

        // Get Days ago
        let commentDate = +new Date(data.updated_at)
        let todayDate = +new Date()
        let daysAgo = Math.floor((((commentDate - todayDate) / 60000)/60)/24)

        this.setState ({
          comment: {
            issue_num: trimNum,
            timestamp: daysAgo,
            op: data.user.login,
            op_img: data.user.avatar_url,
            body: data.body
          }
        })

        return null
      })
    })
  }

  render() {
    console.log(this.state.comment)
    return (
      <div className="App">
        <nav>
          <div className='user'>
            <img src={this.state.user.img} alt='Profile' />
            <span className='username'>{this.state.user.name}</span>
          </div>

          <form action='http://localhost:8888/login' id='form'>
              <button>Login with GitHub</button>
          </form>
        </nav>

        <div className='content-area'>
            <Comment
              issue_num={this.state.comment.issue_num}
              timestamp={this.state.comment.timestamp}
              img={this.state.comment.op_img}
              comment={this.state.comment.body}
            />
        </div>
      </div>
    );
  }
}

export default App;
