import { combineReducers } from 'redux';
import currentUserReducer from './current-user-reducer';
import quizzesReducer from './quizzes-reducer';
import quizShowReducer from './quiz-show-reducer';
import quizzesForm from './quiz-form-reducer';
import cohortsReducer from './cohorts-reducer';
import cohortShowReducer from './cohort-show-reducer'
import studentQuizReducer from './student-quiz-reducer'

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  quizzes: quizzesReducer,
  quizForm: quizzesForm,
  quizShow: quizShowReducer,
  cohorts: cohortsReducer,
  cohortShow: cohortShowReducer,
  studentQuiz: studentQuizReducer, 
})

export default rootReducer;
