// fetch(apiURL + '/repos/seatgeek/product-design/issues/664/comments', {
//   headers: {
//     'Authorization': 'Bearer ' + accessToken
//   }
// }).then((response) =>
//   response.json()
// ).then(data => {
//   this.setState({commentData: {
//     comment: {
//       body: data[0].body
//     }
//   }})
// })

<div className='notifications'>
  {
    <ul>
      {titles.map(function(title){
        return <Comment title={title} />
      })}
    </ul>
  }
</div>


<div className="App">
  <nav>
    <div className='user'>
      <img src={this.state.userData.user.img} alt='Profile' />
      <span className='username'>{this.state.userData.user.name}</span>
    </div>

    <Login />
  </nav>
</div>


// Notification
// GET: Notification Titles
// fetch(apiURL + '/repos/seatgeek/product-design/notifications?participating', {
//   headers: { 'Authorization': 'Bearer ' + accessToken }
// }).then((response) => response.json()).then(data => {
//
//   // Filter Notifications
//   data.filter((notification) =>
//     notification.reason === 'mention' ||
//     notification.reason === 'assign' ||
//     notification.reason === 'author' ||
//     notification.reason === 'comment'
//   )
//
//   // Reduce each notification to:
//   // ID, Title, Latest Comment URL
//   .map(data => {
//
//     // Get current array
//     const exsitingNotifications = this.state.notificationData
//
//     // Set the new state
//     exsitingNotifications.push({
//       id: data.id,
//       title: data.subject.title,
//       url: data.subject.latest_comment_url
//     })
//
//     this.setState({ notificationData: exsitingNotifications })
//
//   })
//   console.log(this.state.notificationData);
// })


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


<div className='content-area'>
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
