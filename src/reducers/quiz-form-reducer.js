import {browserHistory} from 'react-router';

export default function(state = null, action){
  switch (action.type) {
    case 'POST_QUIZ':
      browserHistory.push(`/quizzes/${action.payload.data.id}`)
      return action.payload.data
    case 'SET_QUIZ':
      return action.payload
    case 'ADD_QUESTION':
      const questionObject = state.questions[parseInt(action.payload.id)]
      const questionInput = action.payload.input
      questionObject.content = questionInput
      return state
    default:
      return state
  }
}
