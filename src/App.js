import React, { Component } from 'react';
import './App.scss';

// Imports
import queryString from 'query-string'

import Comment from './Components/Comment/Comment'
import Sidebar from './Components/Sidebar/Sidebar'

var uniqid = require('uniqid');

class App extends Component {
  constructor(){
    super()
    this.state = {
      user_img: '',
      user_name: '',
      comments: []
    }
  }

  componentDidMount(){

    // Loading State
    setTimeout(loading => {
      const loadingState = document.getElementById('tabby-loading-indicator')

      loadingState.outerHTML = ''
    }, 1500)

    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    let apiURL = 'https://api.github.com'

    // User
    fetch(apiURL + '/user', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json()).then(data => {
      this.setState({
        user_img: data.avatar_url,
        user_name: data.name
      })
    })

    // Notifications
    // Playing with the API
    fetch(apiURL + '/repos/seatgeek/product-design/notifications', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json()).then(data => {

      let filterArray = []
      for (var i = 0; i < data.length; i++){
        if (data[i].reason == 'assign'){
          filterArray.push(data[i])
        }
      }

      console.log(filterArray)
    })

    // Comments
    fetch(apiURL + '/repos/seatgeek/product-design/issues/comments?since=2018-11-01T18:54:09+0000', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json()).then(data => {

      data.map(data => {

        // Get Issue Numbers
        let unNum = data.issue_url
        let trimNum = unNum.substr(unNum.length - 3)

        // Get Days ago
        let commentDate = +new Date(data.updated_at)
        let todayDate = +new Date()
        let daysAgo = Math.floor((((commentDate - todayDate) / 60000)/60)/24)

        // Failed attempt at creating array from map
        // this.setState (prevState => ({
        //   comments: [...prevState.comments,
        //     {
        //       key: uniqid(),
        //       issue_num: trimNum,
        //       timestamp: daysAgo,
        //       op: data.user.login,
        //       op_img: data.user.avatar_url,
        //       body: data.body
        //     }
        //   ]
        // }))

        this.setState ({
          comments: {
            key: uniqid(),
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
    return (
      <div className="App">

        <Sidebar
          user_img={this.state.user_img}
          user_name={this.state.user_name}
        />

        <div className='content-area'>
          <Comment
            key={this.state.comments.key}
            issue_num={this.state.comments.issue_num}
            timestamp={this.state.comments.timestamp}
            op={this.state.comments.op}
            op_img={this.state.comments.op_img}
            body={this.state.comments.body}
          />
        </div>

      </div>
    );
  }
}

export default App;
