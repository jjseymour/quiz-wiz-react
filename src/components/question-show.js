import React, { Component } from 'react';
import { connect } from 'react-redux';


class QuestionShow extends Component {

  render(){
    return(
      <div>
        {this.props.question.content}

        <form>
          <input />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  if (state.quizzes) {
    const quiz = state.quizzes.find((quiz) => quiz.id === parseInt(ownProps.params.id[0]))
    const question = quiz.questions.find((question) => question.id === parseInt(ownProps.params.id[1]))
    console.log(question);
    return{
      quiz: quiz,
      question: question
    }
  } else {
    return{
      question: ''
    }
  }

}

export default connect(mapStateToProps)(QuestionShow)
