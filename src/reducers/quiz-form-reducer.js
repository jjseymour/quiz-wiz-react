export default function(state = null, action){
  switch (action.type) {
    case 'SET_QUIZ':
      return action.payload
    case 'ADD_QUESTION':
      const questionObject = state.questions[parseInt(action.payload.id)]
      const questionInput = action.payload.input
      questionObject.content = questionInput
      return state
    case 'ADD_ANSWER':
      const question = state.questions[action.payload.questionId]
      const answerObject = question.possible_answers_attributes[parseInt(action.payload.id)]
      const answerInput = action.payload.input
      answerObject.content = answerInput 
      return state
    case 'ADD_ANSWERS_INPUT':
      let newState = Object.assign({}, state, {questions: [...state.questions]})
      newState.questions[action.payload.id].possible_answers_attributes = action.payload.possible_answers_attributes
      return newState
    case 'POST_QUIZ':
      return action.payload.data
    default:
      return state
  }
}
