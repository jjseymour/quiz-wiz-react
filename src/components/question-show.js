import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addAnswer, fetchStudentQuiz } from '../actions/index'

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

  componentWillMount(){
    this.props.fetchStudentQuiz(this.props.quizId)
  }

  handleAnswer(e){
    e.preventDefault()
    const quiz = this.props.quiz
    const question = this.props.question
    const quizId = quiz.id
    const userAnswer = this.refs.userAnswer.value
    this.props.addAnswer(userAnswer, quizId, this.props.studentQuiz.id, question.id)
    const indexOfCurrentQuestion = quiz.questions.indexOf(question)
    const nextQuestionId = quiz.questions[indexOfCurrentQuestion + 1] && quiz.questions[indexOfCurrentQuestion + 1].id || "finish"
    this.refs.userAnswer.value = ''
    browserHistory.push(`/quizzes/${quiz.id}/questions/${nextQuestionId}`)
  }

  render(){
    return(
      <div>
        <div style={{textAlign: 'left'}}>
          <CodeMirror value={this.props.question.content} autoFocus={true} options={{lineNumbers: true, mode: this.props.question.code_mirror_language, readOnly: true}} />
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
  if (state.studentQuiz) {
    let question =  state.studentQuiz.quiz.questions.find(question => question.id === parseInt(ownProps.params.id[1]))
    return {
      quiz: state.studentQuiz.quiz,
      question: question,
      studentQuiz: state.studentQuiz
    }
  }else {
    return {
      quiz: {},
      question: {content: 'Loading...', code_mirror_language: 'markdown'},
      studentQuiz: {},
      quizId: ownProps.params.id[0],
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addAnswer, fetchStudentQuiz }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionShow)
