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
