import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../actions/index';

class UserSignUp extends Component {
  constructor() {
    super()
    this.handleUserSignup = this.handleUserSignup.bind(this)
  }

  handleUserSignup(event){
    event.preventDefault();
    const user = {first_name: this.refs.first_name.value, last_name: this.refs.last_name.value, email: this.refs.email.value, password: this.refs.password.value, password_confirmation: this.refs.password_confirmation.value}
    this.props.createUser(user);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleUserSignup}>
          <label>First Name: </label>
          <input ref="first_name"/>
          <br/>
          <label>Last Name: </label>
          <input ref="last_name"/>
          <br/>
          <label>Email: </label>
          <input ref="email" type="email"/>
          <br/>
          <label>Password: </label>
          <input ref="password" type="password"/>
          <br/>
          <label>Password Confirmation: </label>
          <input ref="password_confirmation" type="password"/>
          <br/>
          <button value="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({createUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(UserSignUp)
