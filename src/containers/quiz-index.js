import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchQuizzes } from '../actions/index'

class QuizIndex extends Component  {
  componentDidMount() {
    this.props.fetchQuizzes()
  }

  render(){
    return (
      <div>
        <h1>Quizzes</h1>
        <ol>
          {this.props.quizzes.map(function(quiz){
            return <li key={quiz.id}> <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link></li>})}
        </ol>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchQuizzes }, dispatch)
}
function mapStateToProps(state){
  if (!!state.quizzes) {
    return {
      quizzes: state.quizzes
    }
  } else {
    return {
      quizzes: []
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizIndex);
