export default function(state = null, action){
  switch (action.type) {
    case 'START_QUIZ':
      return action.payload.data
    case 'FETCH_STUDENT_QUIZ':
      return action.payload.data
    case 'ADD_ANSWERS':
      return {...state, studentAnswers: action.payload.data.studentAnswers}
    case 'CLEAR_STUDENT_QUIZ':
      return null
    default:
      return state
  }
}
