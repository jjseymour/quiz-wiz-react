import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStudentAnswers } from '../actions/index'

class EndQuiz extends Component {
  componentDidMount() {
    this.props.fetchStudentAnswers(this.props.studentAnswers[0].student_quiz_id)
  }

  handleStudentAnswerShow(){
    if (this.props.studentAnswers){
    return (this.props.studentAnswers.map((answer)=>{
      return(<li key={answer.id}>{answer.content}</li>)
    }))
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.handleStudentAnswerShow()}
        </ul>
      </div>     
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchStudentAnswers }, dispatch)
}

function mapStateToProps(state, myProps) {
    if (state.quizzes) {
        let quiz = state.quizzes.find((indivQuiz) => state.studentQuiz.quiz_id === indivQuiz.id)
        let studentAnswers = state.studentQuiz.studentAnswers
        return {
            quiz,
            studentAnswers
        }
    } else {
        return {
            quiz: {},
            studentAnswers: []
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndQuiz)
