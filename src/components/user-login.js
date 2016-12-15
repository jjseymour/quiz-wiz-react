import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createUserSession} from '../actions/index';

class UserLogin extends Component {
  constructor(){
    super()
    this.handleUserLogin = this.handleUserLogin.bind(this)
  }
  handleUserLogin(event){
    event.preventDefault();
    let user = {email: this.refs.email.value, password: this.refs.password.value}
    this.props.createUserSession(user);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleUserLogin}>
          <label>Email: </label>
          <input ref="email" type="email"/>

          <label>Password</label>
          <input ref="password" type="password"/>

          <button value="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({createUserSession}, dispatch)
}

export default connect(null, mapDispatchToProps)(UserLogin)
