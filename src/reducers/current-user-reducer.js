import {browserHistory} from 'react-router';

export default function(state = null, action) {
  switch (action.type) {
    case 'CREATE_USER_SESSION':
      sessionStorage.setItem('jwt', action.payload.data.jwt)
      browserHistory.push(`/quizzes`)
      return !!sessionStorage.jwt
    case 'CREATE_USER':
      sessionStorage.setItem('jwt', action.payload.data.jwt)
      browserHistory.push(`/quizzes`)
      return !!sessionStorage.jwt
    case 'DESTROY_SESSION':
      sessionStorage.removeItem('jwt');
      browserHistory.push('/login');
      return !!sessionStorage.jwt
    default:
      return state
  }
}
