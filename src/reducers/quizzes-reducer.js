export default function(state = null, action){
  switch (action.type) {
    case 'FETCH_QUIZZES':
      return action.payload.data
    case 'POST_QUIZ':
      return [...state, action.payload.data]
    default:
      return state
  }
}
