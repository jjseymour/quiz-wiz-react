import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as quizFormActions from '../actions/index';
import { bindActionCreators } from 'redux';
import QuestionInput from './question-input-form';

class NewQuizForm extends Component  {
  constructor(){
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(){
    const quizForm = {quiz:{title: this.refs.titleInputField.value, description: this.refs.descriptionInputField.value, questions: this.props.quizForm.questions}}
    this.props.actions.postQuiz(quizForm)
  }

  appendQuestionInput(e) {
    e.preventDefault();
    const newQuestionInput = {inputValue: `input-${this.props.quizForm.questions.length}`};
    this.props.actions.setQuiz({ title: this.refs.titleInputField.value, description: this.refs.descriptionInputField.value, questions: this.props.quizForm.questions.concat([newQuestionInput])});
  }

  render(){
    return (
      <div>
        <form onSubmit={(event)=>{
          event.preventDefault()
          this.handleFormSubmit()
        }}>
          <h2>
            {this.props.quizForm.title}
          </h2>
          <input ref="titleInputField" placeholder="Enter a new Quiz Title" />
          <input ref="descriptionInputField" placeholder="Enter the Quiz Description" />

          <div id="dynamicInput">
            {this.props.quizForm.questions.map((question, index) => <QuestionInput key={index} inputValue={question.inputValue} id={index} ref="questions" />)}
          </div>

          <button onClick={ (e) => this.appendQuestionInput(e) }>
            CLICK ME TO ADD AN INPUT
          </button>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  if (!state.quizForm || state.quizForm.id) {
    return {
      quizForm: {title: '', description: '', questions: []}
    }
  } else {
    return {
      quizForm: state.quizForm
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(quizFormActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuizForm);
