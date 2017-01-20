import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addAnswer } from '../actions/index'

import { browserHistory } from 'react-router';

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/erlang/erlang'
import 'codemirror/mode/python/python'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'

class QuestionShow extends Component {
  constructor(){
    super()
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  handleAnswer(e){
    e.preventDefault()
    const quiz = this.props.quiz
    const question = this.props.question
    const quizId = quiz.id
    const userAnswer = this.refs.userAnswer.value
    this.props.addAnswer(userAnswer, quizId, this.props.studentQuiz.id, question.id)
    const indexOfCurrentQuestion = quiz.questions.indexOf(question)
    const nextQuestionId = quiz.questions[indexOfCurrentQuestion + 1].id
    this.refs.userAnswer.value = ''
    browserHistory.push(`/quizzes/${quiz.id}/questions/${nextQuestionId}`)
  }

  render(){
    return(
      <div>
        <div style={{textAlign: 'left'}}>
          <CodeMirror value={this.props.question.content} autoFocus={true} options={{lineNumbers: true, mode:'ruby', readOnly: true}} />
        </div>
        <form onSubmit={this.handleAnswer}>
          {/* <textArea refs="userAnswer" /> */}
          <input ref="userAnswer" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  if (state.quizzes) {
    const quiz = state.quizzes.find((quiz) => quiz.id === parseInt(ownProps.params.id[0]))
    const question = quiz.questions.find((question) => question.id === parseInt(ownProps.params.id[1]))
    return{
      quiz: quiz,
      question: question,
      studentQuiz: state.studentQuiz
    }
  } else {
    return{
      question: ''
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addAnswer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionShow)
