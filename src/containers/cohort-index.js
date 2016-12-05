import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { fetchCohorts } from '../actions/index';
import { filterElements } from '../actions/index';
import { formatDate } from '../utils/utils'
import  { browserHistory } from 'react-router'
import Table from '../components/table';

class CohortIndex extends Component {

  constructor(props){
    super(props)
    this.state = {filterFlag: false}

  }

  componentWillMount(){
    this.props.fetchCohorts()
  }


  render(){
    if (!!this.props.cohorts){
      return (
        <Table model="cohort" elems={this.props.cohorts} column_one="flatiron_named" column_two="student_named" column_three="start_date" />
      )} else {
        return <div>Hi</div>
      }

  }
}



function mapStateToProps(state){
  return {
    cohorts: state.cohorts,
    userCohorts: state.userCohorts
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchCohorts, filterElements}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CohortIndex);
