export default function(state = null, action){
  switch (action.type) {
    case 'START_QUIZ':
      return action.payload.data
    case 'ADD_ANSWERS':
      return {...state, studentAnswers: action.payload.data.studentAnswers}
    case 'STUDENT_ANSWERS':
      return action.payload.data
    default:
      return state
  }
}
