import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Auth from '../auth/authenticator';
import { destroySession, fetchCurrentUser } from '../actions/index';

class Header extends Component {
  //move to configStore
  componentWillMount() {
    if (Auth.loggedIn()) {
      this.state = {
        loggedIn: true
      }
      this.props.fetchCurrentUser()
    }else {
      this.state = {
        loggedIn: false
      }
    }
  }

  instructor() {
    if (this.props.currentUser) {
      if (this.props.currentUser.instructor) return(<li><Link to={'/quizzes/new'}>New Quiz</Link></li>) 
    }
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to={`/users/:id`}>My Account</Link></li>
              <li><Link to={'/quizzes'}>Quizzes</Link></li>
              {this.state.loggedIn && this.instructor()}
              {!Auth.loggedIn() && <li><Link to={'/login'}>Login</Link></li>}
              {Auth.loggedIn() && <li><a style={{cursor: 'pointer'}} onClick={this.props.destroySession}>Logout</a></li>}
            </ul>
          </div>
        </div>
      </nav>
    )
    }
  }

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({destroySession, fetchCurrentUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
