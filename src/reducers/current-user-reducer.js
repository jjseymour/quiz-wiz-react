export default function(state = null, action) {
  switch (action.type) {
    case 'CREATE_USER_SESSION':
      return {instructor: action.payload.data.instructor}
    case 'CREATE_USER':
      return !!sessionStorage.jwt
    case 'FETCH_CURRENT_USER':
      return action.payload.data
    case 'DESTROY_SESSION':
      return !!sessionStorage.jwt
    default:
      return state
  }
}
