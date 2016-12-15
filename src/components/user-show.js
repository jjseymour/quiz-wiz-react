import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class UserShow extends Component {
  constructor() {

  }
  componentWillMount(){
    console.log(this.props.user.id);
    if (!!this.props.user.id) {
      this.props.actions.fetchUser();
    }
  }
}

function mapStateToProps(state){
  debugger
  // const user = state.users.find((user)=> user.id === )
  if (state.users) {

  }
}

function mapDispatchToProps(){

}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)
