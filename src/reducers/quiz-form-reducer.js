export default function(state = null, action){
  switch (action.type) {
    case 'SET_QUIZ':
      return action.payload
    case 'ADD_QUESTION':
      const questionObject = state.questions_attributes.map((question) => {
        if (question.inputValue !== `input-${action.payload.id}`) {
          return question
        }else {
          return {...question, content: action.payload.content, code_mirror_language: action.payload.code_mirror_language}
        }
      })
      return {...state, questions_attributes: questionObject}
    case 'ADD_ANSWER':
      const questions = state.questions_attributes.map((question) => {
        if (question.inputValue !== `input-${action.payload.questionId}`) {
          return question
        }else {
          const answers = question.possible_answers_attributes.map((answer) => {
            if (answer.inputValue !== `answerInput-${parseInt(action.payload.id)}`) {
              return answer
            }else {
              answer.answer_type = action.payload.answer_type
              answer[action.payload.answer_type] = action.payload[action.payload.answer_type]
              if (action.payload.content) answer.content = action.payload.content
              if (action.payload.code_mirror_language) answer.code_mirror_language = action.payload.code_mirror_language
              return answer
            }
          }, action.payload)
          return {...question, possible_answers_attributes: answers}
        }
      })
      return {...state, questions_attributes: questions} 
    case 'ADD_ANSWERS_INPUT':
      let newState = Object.assign({}, state, {questions_attributes: [...state.questions_attributes]})
      newState.questions_attributes[action.payload.id].possible_answers_attributes = action.payload.possible_answers_attributes
      return newState
    case 'POST_QUIZ':
      return action.payload.data
    case 'CHANGE_QUESTION_ATTRIBUTES':
      const newQuestionAttributes = state.questions_attributes.map((question) => {
        if(question.inputValue != action.payload.inputValue) {
           return question
          } else { 
            return action.payload
          }
        })
      return {...state, questions_attributes: newQuestionAttributes} 
    case 'RESET_QUIZ_FORM':
      return {questions_attributes: []} 
    default:
      return state
  }
}
