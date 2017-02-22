import axios from 'axios';
import {browserHistory} from 'react-router';

export const url = 'http://localhost:3000/';

function getAllQuizzes(data){
  return {
    type: 'FETCH_QUIZZES',
    payload: data 
  }
}

function getOneQuiz(data) {
  return {
    type: 'FETCH_QUIZ',
    payload: data
  }
}

function startStudentQuiz(data) {
  return{
    type: 'START_QUIZ',
    payload: data
  }
}

function addAnswerToStudentQuiz(data) {
  return {
    type: 'ADD_ANSWERS',
    payload: data
  }
}

function postNewQuiz(data) {
  browserHistory.push(`/quizzes/${data.data.id}`)
  return{
    type: 'POST_QUIZ',
    payload: data 
  }
}

function fetchAllCohorts(data) {
  return {
    type: 'FETCH_COHORTS',
    payload: data 
  }
}

function fetchOneCohort(data) {
  return {
    type: 'FETCH_COHORT',
    payload: data
  }
}

function createOneUserSession(data) {
  return {
    type: 'CREATE_USER_SESSION',
    payload: data
  }
}

function createOneUser(data) {
  return {
    type: 'CREATE_USER',
    payload: data
  }
}

export function fetchQuiz(quizId){
  return (dispatch) => {
    axios.get(url + `quizzes/${quizId}`).then((
      data => dispatch(getOneQuiz(data)),
      error => dispatch(getOneQuiz(error))
    ))
  }
}

export function fetchQuizzes(){
  return (dispatch) => {
    axios.get(url + `quizzes`).then((
      data => dispatch(getAllQuizzes(data)),
      error => dispatch(getAllQuizzes(error))
    ))
  }
}

export function postQuiz(quizForm){
  return (dispatch) => {
    axios.post(url + `quizzes`, quizForm).then((
      data => dispatch(postNewQuiz(data)).then((
        () => dispatch(fetchQuizzes())
      )),
      error => dispatch(postNewQuiz(error))
    )) 
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
  return (dispatch) => {
    axios.get(url + 'cohorts').then((
      data => dispatch(fetchAllCohorts(data)),
      error => dispatch(fetchAllCohorts(error))
    ))
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
  return (dispatch) => {
    axios.get(url + `cohorts/${id}`).then((
      data => dispatch(fetchOneCohort(data)),
      error => dispatch(fetchOneCohort(error))
    ))
  }
}

export function createUserSession(user){
  return (dispatch) => {
    axios.post(url + 'login', user).then((
      data => dispatch(createOneUserSession(data)),
      error => dispatch(createOneUserSession(error))
    ))
  }
}

export function createUser(user){
  return (dispatch) => {
    axios.post(url + 'signup', user).then((
      data => dispatch(createOneUser(data)),
      error => dispatch(createOneUser(error))
    ))
  }
}

export function destroySession(e){
  e.preventDefault()
    return {
      type: 'DESTROY_SESSION'
    }
}

export function addAnswer(userAnswer, quizId, studentQuizId, questionId){
  return (dispatch) => {
    axios.post(url + 'answers', {content: userAnswer, student_quiz_id: studentQuizId, quiz_id: quizId, question_id: questionId}).then((
      data => dispatch(addAnswerToStudentQuiz(data)),
      error => dispatch(addAnswerToStudentQuiz(error))
    ))
  }
}

export function startQuiz(quizId, redirectUrl){
  return (dispatch) => {
    axios.post(url + 'student_quizzes', {quiz_id: quizId, jwt: sessionStorage.jwt}).then((
      data => dispatch(startStudentQuiz(data)),
      error => dispatch(startStudentQuiz(error))
    ))
  }
}
