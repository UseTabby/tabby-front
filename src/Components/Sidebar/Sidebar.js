import React, { Component } from 'react';
import './Sidebar.scss'

class Sidebar extends Component {
  render() {
    return(
      <nav>
        <div className='user'>
          <img src={this.props.user_img} alt='Profile' />
          <span className='username'>{this.props.user_name}</span>
        </div>

        <form action='http://localhost:8888/login' id='form'>
            <button>Login with GitHub</button>
        </form>
      </nav>
    )
  }
}

export default Sidebar
