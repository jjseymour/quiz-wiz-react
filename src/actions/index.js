import axios from 'axios';

export const url = 'http://localhost:3000/';

export function fetchQuiz(quizId){
  const request = axios.get(url + `quizzes/${quizId}`)

  return {
    type: 'FETCH_QUIZ',
    payload: request
  }
}

export function fetchQuizzes(){
  const request = axios.get(url + `quizzes`)

  return {
    type: 'FETCH_QUIZZES',
    payload: request
  }
}

export function postQuiz(quizForm){
  const response = axios.post(url + `quizzes`, quizForm)
  return{
    type: 'POST_QUIZ',
    payload: response
  }
}

export function setQuiz(quizForm){
  return {
    type: 'SET_QUIZ',
    payload: quizForm
  }
}

export function addAnswersToQuestion(questionForm){
  return {
    type: 'ADD_ANSWERS_INPUT',
    payload: questionForm
  }
}

export function addQuestionToQuiz(question){
  return {
    type: 'ADD_QUESTION',
    payload: question
  }
}

export function addAnswerToQuiz(answer){
  return {
    type: 'ADD_ANSWER',
    payload: answer
  }
}

export function fetchCohorts(){
  const response = axios.get(url + 'cohorts')
  return {
    type: 'FETCH_COHORTS',
    payload: response
  }
}

export function filterElements(element, column, flag){
  return {
    type: `FILTER_${element}S`,
    payload: column,
    filterFlag: flag
  }
}

export function fetchCohort(id){
  const req = axios.get(url + `cohorts/${id}`)
  return {
    type: 'FETCH_COHORT',
    payload: req
  }
}

export function createUserSession(user){
  const req = axios.post(url + 'login', user)
  return {
    type: 'CREATE_USER_SESSION',
    payload: req
  }
}

export function createUser(user){
  const req = axios.post(url + 'signup', user)
  return {
    type: 'CREATE_USER',
    payload: req
  }
}

export function destroySession(e){
  e.preventDefault()
    return {
      type: 'DESTROY_SESSION'
    }
}

export function addAnswer(userAnswer, quizId, studentQuizId, questionId){
  const req = axios.post(url + 'answers', {content: userAnswer, student_quiz_id: studentQuizId, quiz_id: quizId, question_id: questionId})
  return {
    type: 'ADD_ANSWERS',
    payload: req
  }
}

export function startQuiz(quizId, redirectUrl){
  const req = axios.post(url + 'student_quizzes', {quiz_id: quizId, jwt: sessionStorage.jwt})
  return{
    type: 'START_QUIZ',
    payload: req
  }
}
