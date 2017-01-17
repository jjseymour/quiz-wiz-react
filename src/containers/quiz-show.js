import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, startQuiz } from '../actions/index';
import QuestionIndex from '../components/question-index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class QuizShow extends Component {
  componentDidMount(){
    this.props.fetchQuiz(this.props.params.id)
  }
  constructor(){
    super()
    this.state = {questions: null}
    this.showQuestions = this.showQuestions.bind(this)
    this.handleStartQuiz = this.handleStartQuiz.bind(this)
  }

  showQuestions(){
    const questions = this.props.quizShow.questions.map(function(question){
      return (
        <QuestionIndex key={question.id} content={question.content}/>
      )}
    )
    this.setState({questions: questions})
  }

  handleStartQuiz(e){
    e.preventDefault()
    this.props.startQuiz(this.props.quizShow.id, this.refs.startQuiz.value)
    browserHistory.push(this.refs.startQuiz.value)
  }
  render() {
    if (!this.props.quizShow) {
      return <div>Loading...</div>
    }
    return(
      <div>
        <p>
          <Link to={`/quizzes`} className="pull-left"> {"<-- Back"}</Link>
        </p>
        <br />
        <div>{this.props.quizShow.title}</div>
        <div>{this.props.quizShow.description}</div>

        <button onClick={this.showQuestions} >View Questions</button>
        <ol>{this.state.questions}</ol>
        {/* <Link to={`/quizzes/${this.props.quizShow.id}/questions/${this.props.quizShow.questions[0].id}`} >Take Quiz</Link> */}
        {/* button with action that creates a new student_quiz */}
        <button onClick={this.handleStartQuiz} ref="startQuiz" value={`/quizzes/${this.props.quizShow.id}/questions/${this.props.quizShow.questions[0].id}`} >Take Quiz</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    quizShow: state.quizShow
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchQuiz, startQuiz }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizShow)
