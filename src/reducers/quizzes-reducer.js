export default function(state = null, action){
  switch (action.type) {
    case 'FETCH_QUIZZES':
      return action.payload.data
    default:
      return state
  }
}
