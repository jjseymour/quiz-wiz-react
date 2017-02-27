import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import QuizIndex from './containers/quiz-index';
import NewQuizForm from './components/new-quiz-form';
import QuizShow from './containers/quiz-show';
import CohortIndex from './containers/cohort-index';
import CohortShow from './containers/cohort-show';
import QuestionShow from './components/question-show';
import UserLogin from './components/user-login';
import UserSignUp from './components/user-signup';
import EndQuiz from './components/end-quiz';
import auth from './auth/authenticator';
import isInstructor from './helpers/newQuizPermissionHandle';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={UserLogin}/>
    <Route path="signup" component={UserSignUp}/>
    <Route path="quizzes" onEnter={requireAuth}>
      <IndexRoute component={QuizIndex} />
      <Route path="new" >
        <IndexRoute component={isInstructor(NewQuizForm)} />
      </Route>
      <Route path=":id" component={QuizShow} />
      <Route path=":id/questions/finish" component={EndQuiz} />
      <Route path=":id/questions/:id" component={QuestionShow} />
    </Route>
    <Route path="cohorts" onEnter={requireAuth}>
      <IndexRoute component={CohortIndex} />
      <Route path=":id" component={isInstructor(CohortShow)} />
    </Route>
  </Route>
)

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

