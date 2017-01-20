
export default function(state = null, action){
  switch (action.type) {
    case 'START_QUIZ':
      console.log("in START_QUIZ", action.payload);
      return action.payload.data
    default:
      return state
  }
}
