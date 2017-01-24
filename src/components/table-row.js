import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { formatDate } from '../utils/utils'

class TableRow extends Component {

  constructor(props){
    super(props)
    this.state = {textDecoration: "none"}
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.formatRow = this.formatRow.bind(this)
  }

  handleMouseOut(){
    this.setState({textDecoration: "none"})
  }

  handleHover(){
    this.setState({textDecoration: "underline"})
  }

  formatRow(rowText){
    return Date.parse(rowText) ? formatDate(new Date(rowText)) : rowText;
  }

  render(){
    let row = this.props.row
    return (
      <tr key={this.props.key} onClick={()=>{browserHistory.push(`/${this.props.model}s/${this.props.row.id}`)}} onMouseEnter={()=>{this.handleHover()}} onMouseOut={this.handleMouseOut}>
        <td className="col-xs-4" style={{textDecoration: this.state.textDecoration}}>{this.formatRow(row[this.props.column_one])}</td>
        <td className="col-xs-4" style={{textDecoration: this.state.textDecoration}}>{this.formatRow(row[this.props.column_two])}</td>
        <td className="col-xs-4" style={{textDecoration: this.state.textDecoration}}>{this.formatRow(row[this.props.column_three])}</td>
      </tr>
    )
  }
}

export default TableRow
