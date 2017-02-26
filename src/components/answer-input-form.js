import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAnswerToQuiz } from '../actions/index';
import { bindActionCreators } from 'redux';
import RadioButton from '../components/radio_button';

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

class NewAnswerForm extends Component {
  constructor(props) {
    super(props)
    if (Object.keys(this.props.answer).length > 2) {
      this.state = {...this.props.answer, options: {lineNumbers: true, mode: this.props.answer_type}, content: this.props.answer.content}
    }else {
      this.state = {options: {lineNumbers: true, mode: 'css'}, code: 'div {\n\tposition: relative;\n\tdisplay: block;\n}', content: 'option1', answer_type: "short_answer"}
    }
    this.updateAnswers = this.updateAnswers.bind(this)
    this.handleDropDownChange = this.handleDropDownChange.bind(this)
    this.handleCodeMirrorDropDownChange = this.handleCodeMirrorDropDownChange.bind(this)
    this.updateRadioAnswer = this.updateRadioAnswer.bind(this)
    this.handleRadioButtonAnswerChange = this.handleRadioButtonAnswerChange.bind(this)
  }

  updateAnswers(newCode) {
    let answer;
    if (this.state.answer_type === "short_answer") {
      answer = {questionId: this.props.questionId, answer_type: this.state.answer_type, id: this.refs.answerContentInputField.id, short_answer: newCode.target.value}
    } else if (this.state.answer_type === "long_answer") {
      answer = {questionId: this.props.questionId, answer_type: this.state.answer_type, id: this.refs.answerContentInputField.id, long_answer: newCode.target.value}
    }
    this.props.addAnswerToQuiz(answer)
    this.setState({code: newCode.target.value})
  }

  updateRadioAnswer(newCode) {
    let answer;
    if (this.state.answer_type === "multiple_choice_short") {
      answer = {questionId: this.props.questionId, answer_type: this.state.answer_type, content: this.state.content, id: this.refs.answerContentInputField.props.id, multiple_choice_short: newCode}
    } else if (this.state.answer_type === "multiple_choice_long") {
      answer = {questionId: this.props.questionId, answer_type: this.state.answer_type, content: this.state.content, id: this.refs.answerContentInputField.props.id, multiple_choice_long: newCode}
    } else if (this.state.answer_type === "code") {
      answer = {questionId: this.props.questionId, answer_type: this.state.answer_type, id: this.refs.answerCodeMirrorContentInputField.props.id, code: newCode, code_mirror_language: this.state.options.mode}
    }
    this.props.addAnswerToQuiz(answer)
    this.setState({code: newCode})
  }

  handleRadioButtonAnswerChange(e) {
    let button = e.target.value
    this.setState({...this.state, content: button})
  }

  handleDropDownChange(e){
    e.preventDefault()
    this.setState({...this.state, answer_type: this.refs.answer_type.value})
    // this.props.changeAnswerType()
  }

   handleCodeMirrorDropDownChange(e) {
     e.preventDefault()
     const langDefaults = {
        css: 'div {\n\tposition: relative;\n\tdisplay: block;\n}',
        erlang: 'defModule Flatiron do\n\tdef init({name})\n\t\tString.to_something(name)\n\tend\nend',
        htmlmixed: '<div class="flatiron">\n\t<h1>Welcome to Flatiron!</h1>\n</div>',
        javascript: 'const component = {\n\tname: "flatiron quizmaker",\n\tauthor: "JJ Seymour",\n\trepo: "https://github.com/jjseymour"\n};',
        jsx: 'import * as something from "somewhere"\n\nexport default class Flatiron{\n\trender(){\n\t\treturn <div>Welcome to Flatiron!</div>\n\t}\n}',
        markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [JJ Seymour](https://github.com/jjseymour)',
        python: 'class Flatiron:\n\tdef _init_(self, name)\n\t\tself.name = name',
        ruby: 'class Flatiron\n\tattr_accessor :name\n\n\tdef initialize(name)\n\t\t@name = name\n\tend\nend',
        sql: "SELECT *, COUNT(song.name) AS song_names\nFROM artists\nGROUP BY artists.id\nHAVING song_names > 10",
        swift: 'class Flatiron {\n\tfunc someFunc() -> Bool {\n\t\treturn true\n\t}\n}',
        xml: '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<Table>\n\t<Product>\n\t\t<Product_id>1</Product_id>\n\t\t<Product_name>Flatiron</Product_name>\n\t</Product>\n</Table>',
     }
     const objValues = Object.values(langDefaults)
     if (objValues.includes(this.refs.answerCodeMirrorContentInputField.props.value)) {
       this.setState({options: {lineNumbers: true, mode: this.refs.languageDropDown.value}, code: langDefaults[this.refs.languageDropDown.value]})
     } else {
       this.setState({options: {lineNumbers: true, mode: this.refs.languageDropDown.value}, code: this.refs.answerCodeMirrorContentInputField.props.value})
     }
   }

  handleInputType() {
    if (this.state.answer_type === "short_answer"){
      return <input id={this.props.id} ref="answerContentInputField" onChange={this.updateAnswers}/>
    } else if (this.state.answer_type === "code"){
      return (
        <div>
          <select defaultValue="css" ref="languageDropDown" onChange={this.handleCodeMirrorDropDownChange}>
            <option value="css">CSS</option>
            <option value="erlang">Elixir</option>
            <option value="htmlmixed">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="markdown">Markdown</option>
            <option value="python">Python</option>
            <option value="ruby">Ruby</option>
            <option value="sql">SQL</option>
            <option value="swift">Swift</option>
            <option value="xml">XML</option>
          </select>
          <CodeMirror id={this.props.id} value={this.state.code} autoFocus={true} ref="answerCodeMirrorContentInputField" onChange={this.updateRadioAnswer} options={this.state.options}  />
        </div>
      )
    } else if (this.state.answer_type === "long_answer") {
      return <textarea id={this.props.id} ref="answerContentInputField" onChange={this.updateAnswers} />
    } else if (this.state.answer_type === "multiple_choice_long") {
      return (
        <RadioButton id={this.props.id} ref="answerContentInputField" updateRadioAnswerChange={this.handleRadioButtonAnswerChange} content={this.state.content} type="textarea" updateAnswer={this.updateRadioAnswer} />
      )
    } else if (this.state.answer_type === "multiple_choice_short") {
      return (
        <RadioButton id={this.props.id} ref="answerContentInputField" updateRadioAnswerChange={this.handleRadioButtonAnswerChange} content={this.state.content} type="input" updateAnswer={this.updateRadioAnswer} />
      )
    }
  }

  render() {
    return (
      <div >
        <h3>
          Answer {this.props.id + 1}:
        </h3>
          <select defaultValue="short_answer" ref="answer_type" onChange={this.handleDropDownChange}>
            <option value="code">Code</option>
            <option value="short_answer">Short Answer</option>
            <option value="long_answer">Long Answer</option>
            <option value="multiple_choice_long">Multiple Choice Long Answers</option>
            <option value="multiple_choice_short">Multiple Choice Short Answers</option>
          </select>
          <div>
            {this.handleInputType()}
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
