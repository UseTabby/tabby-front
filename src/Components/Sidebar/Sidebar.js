import React, { Component } from 'react';
import './Sidebar.scss'

import Focus from './Assets/Focus.svg'
import Inbox from './Assets/Inbox.svg'
import Read from './Assets/Read.svg'
import Assigned from './Assets/Assigned.svg'
import Closed from './Assets/Closed.svg'

import Logout from './Assets/Logout.svg'

let ProdURL = 'https://tabby-server.herokuapp.com/login'
let StagURL = 'https://localhost:8888/login'

class Sidebar extends Component {
  render() {
    return(
      <nav id='sidebar'>
        <div className='user'>
          <img src={this.props.user_img} alt='Profile' />
          <span className='username'>{this.props.user_name}</span>

          <ul id='sidebar-menu'>
            <li><img src={Logout} /><span>Logout</span></li>
          </ul>
        </div>

        <ul className='sidebar-nav'>
          <li><img src={Focus} /><span>Focus</span></li>

          <li className='active'><img src={Inbox} /><span>Inbox</span></li>
          <li><img src={Read} /><span>Read</span></li>
          <li><img src={Assigned} /><span>Assigned</span></li>
          <li><img src={Closed} /><span>Closed</span></li>
        </ul>

        <form action={StagURL} id='form'>
            <button>Login with GitHub</button>
        </form>
      </nav>
    )
  }
}

export default Sidebar
