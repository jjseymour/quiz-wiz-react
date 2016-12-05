export function formatDate(date){
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

var months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}


export function formatText(text){
  let str = text.split("_").map((word)=>{
    return word[0].toUpperCase().concat(word.slice(1, word.length))
  })
  return str.join(" ")
}

function direction (bool){
  return bool ? 1 : -1;
}

export function sortElements(state, column, ascending){
  return Object.assign([], state.slice().sort((a, b)=>{
    if (a[column] < b[column]){
      return direction(ascending)
    } else if (a[column] > b[column]){
      return direction(!ascending)
    } else {
      return 0;
    }
  }))
}
