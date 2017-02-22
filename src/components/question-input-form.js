import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestionToQuiz } from '../actions/index';
import { addAnswersToQuestion } from '../actions/index';
import { bindActionCreators } from 'redux';

import AnswerInput from './answer-input-form';

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

class QuestionInput extends Component {
  constructor(){
    super()
    this.state = {options: {lineNumbers: true, mode: 'css'}, code: 'div {\n\tposition: relative;\n\tdisplay: block;\n}', possible_answers_attributes: []}
    this.updateCode = this.updateCode.bind(this)
    this.handleDropDownChange = this.handleDropDownChange.bind(this)
  }

   updateCode(newCode) {
       let question = {id: this.refs.questionContentInputField.props.id, input: newCode}
       this.setState({options: {lineNumbers: true, mode: this.refs.languageDropDown.value}, code: newCode, possible_answers_attributes: this.props.possible_answers_attributes})
       this.props.addQuestionToQuiz(question)
   }

   appendAnswerInput(e) {
    e.preventDefault();
    const newAnswerInput = {inputValue: `answerInput-${this.props.possible_answers_attributes.length}`, answer_type: "shortAnswer"};
    this.props.addAnswersToQuestion({ id: this.props.id, possible_answers_attributes: this.props.possible_answers_attributes.concat([newAnswerInput])}) 
   }

   handleDropDownChange(e) {
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
     if (objValues.includes(this.refs.questionContentInputField.props.value)) {
       this.setState({options: {lineNumbers: true, mode: this.refs.languageDropDown.value}, code: langDefaults[this.refs.languageDropDown.value]})
     }else {
       this.setState({options: {lineNumbers: true, mode: this.refs.languageDropDown.value}, code: this.refs.questionContentInputField.props.value})
     }
   }

  render() {
    return(
      <div>
        <h3>
          Question {this.props.id + 1}:
        </h3>
          <select defaultValue="css" ref="languageDropDown" onChange={this.handleDropDownChange}>
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
          <div style={{textAlign: 'left'}}>
            <CodeMirror id={this.props.id} value={this.state.code} autoFocus={true} ref="questionContentInputField" onChange={this.updateCode} options={this.state.options}  />

           {this.props.possible_answers_attributes.map((answer, index) => {
             return (<AnswerInput key={index} inputValue={answer.inputValue} id={index} questionId={this.props.id} ref="answers" />)
              })
            }
          </div>
          <button onClick={ (e) => this.appendAnswerInput(e) }>
            Add an Answer
          </button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  if (!ownProps.answers) {
    return {
      possible_answers_attributes: [],
      id: ownProps.id
    }
  }else {
    return {
      possible_answers_attributes: ownProps.answers,
      id: ownProps.id
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addQuestionToQuiz, addAnswersToQuestion }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionInput);
