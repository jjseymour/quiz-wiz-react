import { browserHistory } from 'react-router'

export default function(state = null, action){
  switch (action.type) {
    case 'FETCH_QUIZZES':
      return action.payload.data
    case 'START_QUIZ':
      console.log("in START_QUIZ", action.payload);
      return {studentQuiz: action.payload.data, allQuizzes: state}
    default:
      return state
  }
}
