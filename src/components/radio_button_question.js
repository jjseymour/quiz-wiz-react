import React, { Component } from 'react';

export default class RadioButton extends Component {
  constructor(props){
    super(props)
    let newOptions = this.props.options.map((option) => {
      return{'data':option}
    })
    this.state = {
      options: newOptions,
      checked: ''
    }
    this.updateRadioAnswerChange = this.updateRadioAnswerChange.bind(this)
    this.showOptions = this.showOptions.bind(this)
  }

  updateRadioAnswerChange(e) {
    this.setState({...this.state, checked: e.target.value})
  }
  
  showOptions(){
   return this.state.options.map((option, index)=>{
      return (
        <div className="radio" key={index + 1}>
          <label>
            <input type="radio" value={`option${index + 1}`} 
              checked={this.state.checked === `option${index + 1}`}
                          onChange={this.updateRadioAnswerChange} />
              <label data-id={option.optionId} value={option.data} >{option.data}</label>
          </label>
        </div>
      )
    })
  }

  render(){
    return(
      <div>
        {this.showOptions()}
      </div>
    )
  }
}
