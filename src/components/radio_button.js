import React, { Component } from 'react';

export default class RadioButton extends Component {
  constructor(){
    super()
    this.state = {
      options: [{'placeholder': 'Option 1', 'optionId': 'option1', 'data': ''}, {'placeholder': 'Option 2', 'optionId': 'option2', 'data': ''}, {'placeholder': 'Option 3', 'optionId': 'option3', 'data': ''}]
    }
    // this.handleOptionChange = this.handleOptionChange.bind(this)
    this.addOption = this.addOption.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // handleOptionChange(e){
  //   let button = e.target.value
  //   this.setState({...this.state, content: button})
  // }

  handleInputChange(e){
    e.preventDefault()
    let option = this.state.options.find(option => option.optionId === e.target.dataset.id)
    let optionArray = this.state.options.filter(option => option.optionId !== e.target.dataset.id)
    option.data = e.target.value
    let updatedOptions = this.state.options.map((option) => {
      return option.data
    })
    this.props.updateAnswer(updatedOptions)
  }
  
  showOptions(){
   return this.state.options.map((option, index)=>{
      return (
        <div className="radio" key={index + 1}>
          <label>
            <input type="radio" value={`option${index + 1}`} 
                          checked={this.props.content === `option${index + 1}`} 
                          onChange={this.props.updateRadioAnswerChange} />
            {this.props.answer_type === "textarea" ? (
              <textarea data-id={option.optionId} placeholder={option.placeholder} onChange={this.handleInputChange} />
            ) : (
              <input data-id={option.optionId} placeholder={option.placeholder} onChange={this.handleInputChange} />
            )}
          </label>
        </div>
      )
    })
  }

  addOption(e){
    e.preventDefault()
    let optionId = this.state.options.length + 1
    this.setState({...this.state, options: [...this.state.options, {'placeholder': `Option ${optionId}`, 'optionId': `option${optionId}`, 'data': ""}]})
  }

  render(){
    return(
      <div>
        {this.showOptions()}
        <button onClick={this.addOption}>+</button>
      </div>
    )
  }
}
