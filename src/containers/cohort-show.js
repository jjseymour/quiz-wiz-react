import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCohort } from '../actions/index';
import TableRow from '../components/table-row';
import Table from '../components/table'


class CohortShow extends Component {
  constructor(props){
    super(props)
    this.cohortDataLoaded = this.cohortDataLoaded.bind(this)
  }

  componentDidMount(){
    this.props.fetchCohort(this.props.params.id)
  }

  cohortDataLoaded(){
    return (!!this.props.cohortShow && !!this.props.cohortShow.students)
  }

  render(){
    if (this.cohortDataLoaded()){
      return (
          <Table model="student" elems={this.props.cohortShow.students} column_one="first_name" column_two="last_name" column_three="email" />
      )
    } else {
      return (<div>blah blah</div>)
    }
  }
}

function mapStateToProps(state) {
  return {
    cohortShow: state.cohortShow
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchCohort }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CohortShow)
