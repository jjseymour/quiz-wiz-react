import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addAnswer, fetchStudentQuiz } from '../actions/index'

import { browserHistory } from 'react-router';

import RadioButton from './radio_button_question';

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
  constructor(props){
    super(props)
    this.state = {code: this.props.question.content}
    this.handleAnswer = this.handleAnswer.bind(this)
    this.updateCode = this.updateCode.bind(this)
  }

  componentWillMount(){
    this.props.fetchStudentQuiz(this.props.quizId)
  }

  componentWillReceiveProps(props) {
    this.setState({code: props.question.content})
  }

  handleAnswer(e){
    e.preventDefault()
    const quiz = this.props.quiz
    const question = this.props.question
    const quizId = quiz.id
    let userAnswer
    let userValue
    if (this.props.question.possible_answers[0].answer_type === "multiple_choice_long" || this.props.question.possible_answers[0].answer_type === "multiple_choice_short") {
      userAnswer = this.refs.userAnswer.state.checked
      // userValue = this.refs.userAnswer.state.options.find((option, index)=> `option${index+1}`===this.refs.userAnswer.state.checked).data
    }else if(this.props.question.possible_answers[0].answer_type === "code") {
      userAnswer = this.refs.userAnswer.props.value
    }else {
      userAnswer = this.refs.userAnswer.value
      // userValue = null
    }
    this.props.addAnswer(userAnswer, quizId, this.props.studentQuiz.id, question.id)
    const indexOfCurrentQuestion = quiz.questions.indexOf(question)
    const nextQuestionId = quiz.questions[indexOfCurrentQuestion + 1] && quiz.questions[indexOfCurrentQuestion + 1].id || "finish"
    this.refs.userAnswer.value = ''
    browserHistory.push(`/quizzes/${quiz.id}/questions/${nextQuestionId}`)
  }

  updateCode(newCode) {
     this.setState({code: newCode})
  }

  handleAnswerInput() {
    switch (this.props.question.possible_answers[0].answer_type) {
      case 'code':
        return (
          <div style={{textAlign: 'left'}}>
            <CodeMirror value={this.state.code} autoFocus={true} ref="userAnswer" onChange={this.updateCode} options={{lineNumbers: true, mode: this.props.question.possible_answers[0].code_mirror_language, readOnly: false}} />
          </div>
          )
      case 'long_answer':
        return (<textArea ref="userAnswer" />)
      case 'short_answer':
        return (<input ref="userAnswer" />)
      case 'multiple_choice_long':
        return (<RadioButton options={this.props.question.possible_answers[0].multiple_choice_long} ref="userAnswer" />)
      case 'multiple_choice_short':
        return (<RadioButton options={this.props.question.possible_answers[0].multiple_choice_short} ref="userAnswer" />)
      default:
        return "Loading..."
    }
  }
  
  render(){
    return(
      <div>
        <div style={{textAlign: 'left'}}>
          <CodeMirror value={this.props.question.content} autoFocus={true} options={{lineNumbers: true, mode: this.props.question.code_mirror_language, readOnly: true}} />
        </div>
        <form onSubmit={this.handleAnswer}>
          <label>Your Answer: </label>
          {this.props.question.possible_answers && this.handleAnswerInput()}
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
