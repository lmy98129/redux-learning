const actionTypes = {
  INIT: "TIMESEL/INIT",
  EDIT: "TIMESEL/EDIT",
  EMPTY: "TIMESEL/EMPTY"
}

const defaultState = {
  timeSelValue: "Empty",
  timeSel: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  week: "0000000000000000"
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case "TIMESEL/INIT": 
      return {
        ...state,
        timeSelValue: "Init",
        timeSel: action.timeSel,
        week: action.week
      }
    case "TIMESEL/EDIT":
      return {
        ...state,
        timeSelValue: "Edit",
        timeSel: action.timeSel,
        week: action.week
      }
    case "TIMESEL/EMPTY":
      return defaultState;
    default: 
      return state;
  }
}

const TwoDimArray2Str = (timeSel) => {
  let OneDimArray = [].concat.apply([], timeSel);
  return OneDimArray.join("")
}

export const initTimeSel = (timeString, dispatch) => {
  let timeStrArr = [], timeSel = [], week;
  timeStrArr = timeString.split("");
  for (let i=0; i<4; i++) {
    timeSel.push([])
    for (let j=0; j<4; j++) {
      timeSel[i].push(parseInt(timeStrArr.shift()));
    }
  }
  week = TwoDimArray2Str(timeSel);
  return dispatch({ type: actionTypes.INIT, timeSel, week });
}

export const editTimeSel = (row, col, timeSel, status, dispatch) => {
  let week;
  timeSel[row][col] = status;
  week = TwoDimArray2Str(timeSel);
  return dispatch({ type: actionTypes.EDIT, timeSel, week });
}

const filter = (i, j, mode) => {
  switch(mode) {
    case 'odd': 
      return (i*4+(j+1) % 2 == 1);
    case 'even': 
      return (i*4+(j+1) % 2 == 0);
    case 'all':
      return true;
  }
}

export const filterTimeSel = (mode, timeSel, dispatch) => {
  let week;
  for (let i=0; i<4; i++) {
    for (let j=0; j<4; j++) {
      if (filter(i, j, mode)) {
        timeSel[i][j] = 2;
      }
    }
  }
  week = TwoDimArray2Str(timeSel);
  return dispatch({ type: actionTypes.EDIT, timeSel, week});
}

export const emptyTimeSel = (dispatch) => dispatch({type: actionTypes.EMPTY});