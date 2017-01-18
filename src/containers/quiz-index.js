import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class QuizIndex extends Component  {
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

export default connect(mapStateToProps)(QuizIndex);
