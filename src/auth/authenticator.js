class Auth {
  static loggedIn() {
    return sessionStorage.jwt === 'undefined' ? false : !!sessionStorage.jwt
  }
}

export default Auth;
