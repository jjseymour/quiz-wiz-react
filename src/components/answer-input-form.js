import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewAnswerForm extends Component {
  render() {
    return (
      <div style={{textAlign: 'right'}}>
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
            <input />
          </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log("state: ", state)
  console.log("ownProps: ", ownProps)
  return {
    id: ownProps.id
  }
}

export default connect(mapStateToProps)(NewAnswerForm);
