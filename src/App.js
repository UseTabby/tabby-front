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
      comments: [],
      showComments: false,
    }
  }

  componentDidMount(){

    // Define
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    let apiURL = 'https://api.github.com'

    // Loading State
    setTimeout(loading => {
      const loadingState = document.getElementById('tabby-loading-indicator')
      loadingState.outerHTML = ''
      this.setState({
        showComments: true
      })
    }, 1500)

    // User Fetch
    fetch(apiURL + '/user', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => response.json()).then(data => {
      this.setState({
        user_img: data.avatar_url,
        user_name: data.name
      })
    })

    // Notifications
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

        console.log(filteredData)

        // Get Issue Numbers
        let issueNum = filteredData.subject.url.substr(filteredData.subject.url.length - 3)

        // Days ago
        let commentDate = +new Date(filteredData.updated_at)
        let todayDate = +new Date()
        let daysAgo = Math.floor((((commentDate - todayDate) / 60000)/60)/24)

        // Get comment body
        // Need to map over the results from the prev fetch and then fetch this data using that map
        fetch(filteredData.subject.latest_comment_url, {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then((res) => res.json()).then(commentBody => {

          // Create consts of the relevent infomatoin
          const opBody = commentBody.body
          const opImg = commentBody.user.avatar_url

          this.setState (prevState => ({
            comments: [...prevState.comments, {
              key: uniqid(),
              title: filteredData.subject.title,
              url: filteredData.subject.url,
              timestamp: daysAgo,
              issue_num: issueNum,
              body: opBody,
              img: opImg
            }]
          }))
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

      </div>
    );
  }
}

export default App;
