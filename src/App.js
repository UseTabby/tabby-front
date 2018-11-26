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
      showComments: false,
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

    setTimeout(loadComments => {
      this.setState({
        showComments: true
      })
    }, 2000)

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

      // Create array with relevent notifications
      let filterArray = []
      for (var i = 0; i < data.length; i++){
        if (data[i].reason === 'assign'){
          filterArray.push(data[i])
        }
      }

      filterArray.map(filteredData => {
        this.setState (prevState => ({
          comments: [...prevState.comments, {
            key: uniqid(),
            title: filteredData.subject.title,
            url: filteredData.subject.url
          }]
        }))
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

        {
          this.state.showComments &&
          this.state.comments.map(comment =>
            <Comment
              key={comment.key}
              title={comment.title}
              issue_num='000'
              timestamp='3'
              op='Dan'
              op_img={comment.op_img}
              body='comment body'
            />
          )
        }

        </div>

      </div>
    );
  }
}

export default App;
