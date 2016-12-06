import React, { Component } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Header = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link to={`/users/:id`}>My Account</Link></li>
            <li><Link to={'/quizzes'}>Quizzes</Link></li>
            <li><Link to={'/quizzes/new'}>New Quiz</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Header)
