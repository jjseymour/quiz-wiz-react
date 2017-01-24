// import {browserHistory} from 'react-router';
// import {destroySession} from '../actions/index';

class Auth {
  static loggedIn() {
    return !!sessionStorage.jwt;
  }
}

export default Auth;
