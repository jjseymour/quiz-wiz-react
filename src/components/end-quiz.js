import React, { Component } from 'react'
import { connect } from 'react-redux';

class EndQuiz extends Component {

  handleStudentAnswerShow(){
    return (this.props.studentAnswers.map((answer)=>{
      return(<li key={answer.id}>{answer.content}</li>)
    }))
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

function mapStateToProps(state, myProps) {
 let quiz = state.quizzes.find((indivQuiz) => state.studentQuiz.quiz_id === indivQuiz.id)
 let studentAnswers = state.studentQuiz.studentAnswers
 return {
  quiz,
  studentAnswers
 }
}

export default connect(mapStateToProps)(EndQuiz)
