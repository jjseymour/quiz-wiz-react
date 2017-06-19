import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStudentQuiz } from '../actions/index';

class EndQuiz extends Component {
  componentWillMount() {
    this.props.fetchStudentQuiz(this.props.quizId)
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

function mapStateToProps(state, myProps) {
 if (state.studentQuiz) {
   let studentAnswers = state.studentQuiz.studentAnswers
    return {
      quiz: state.studentQuiz,
      studentAnswers
    }
 }else {
  return {
    quiz: state.studentQuiz,
    studentAnswers: [],
    quizId: myProps.params.id
  }
 }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchStudentQuiz }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EndQuiz)
