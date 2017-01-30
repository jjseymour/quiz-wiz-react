import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAnswerToQuiz } from '../actions/index';
import { bindActionCreators } from 'redux';

class NewAnswerForm extends Component {
  constructor(){
    super()
    this.state = {code: ''}
    this.updateAnswers = this.updateAnswers.bind(this)
  }

  updateAnswers(newCode) {
    let answer = {questionId: this.props.questionId, id: this.refs.answerContentInputField.id, input: newCode.target.value}
    this.setState({code: newCode.target.value})
    this.props.addAnswerToQuiz(answer)
  }

  render() {
    return (
      <div >
        <h3>
          Answer {this.props.id + 1}:
        </h3>
          <select defaultValue="shortAnswer" ref="answerType" onChange={this.handleDropDownChange}>
            <option value="code">Code</option>
            <option value="shortAnswer">Short Answer</option>
            <option value="longAnswer">Long Answer</option>
            <option value="multipleChoice">Multiple Choice</option>
          </select>
          <div>
            <input id={this.props.id} ref="answerContentInputField" onChange={this.updateAnswers}/>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.id,
    questionId: ownProps.questionId
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addAnswerToQuiz }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswerForm);
