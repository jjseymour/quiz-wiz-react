import { sortElements } from '../utils/utils';

export default function(state=null, action=null){
  switch (action.type){
    case 'FETCH_COHORT':
     return action.payload.data
    case 'FILTER_STUDENTS':
     return Object.assign({}, state, {students: sortElements(state.students, action.payload, action.filterFlag)});
    default:
     return state
  }
}
