import React, { Component } from 'react';
import TableRow from './table-row';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatDate } from '../utils/utils';
import { filterElements } from './../actions/index'
import { formatText } from '../utils/utils';

class Table extends Component {
  constructor(props){
    super(props)
    this.renderRows = this.renderRows.bind(this)
    this.handleTableClick = this.handleTableClick.bind(this)
    this.state = {filterFlag: false}
  }

  renderRows(elems){
    return elems.map(row =>{
      return (
        <TableRow row={row} key={row.id} model={this.props.model}
          column_one={this.props.column_one} column_two={this.props.column_two} column_three={this.props.column_three}
         />
      )
    }, this )
  }

  handleTableClick(e){
    this.setState({filterFlag: !this.state.filterFlag})
    let model = this.props.model.toUpperCase()
    this.props.filterElements(model, e.target.id, this.state.filterFlag)
  }

  render(){
    return (
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead inverse">
            <tr>
              <th><span onClick={this.handleTableClick}  id={this.props.column_one} className="glyphicon glyphicon-sort" aria-hidden="true"></span> {formatText(this.props.column_one)} </th>
              <th><span onClick={this.handleTableClick} id={this.props.column_two} className="glyphicon glyphicon-sort" aria-hidden="true"></span> {formatText(this.props.column_two)} </th>
              <th><span onClick={this.handleTableClick} id={this.props.column_three} className="glyphicon glyphicon-sort" aria-hidden="true"></span> {formatText(this.props.column_three)}</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows(this.props.elems)}
          </tbody>
        </table>
    )
  }

}


function mapDispatchToProps(dispatch){
  return bindActionCreators({filterElements}, dispatch)
}



export default connect(null, mapDispatchToProps)(Table);
