const actionTypes = {
  INIT: "TIMESEL/INIT",
  EDIT: "TIMESEL/EDIT",
  EMPTY: "TIMESEL/EMPTY",
  FILTERED: "TIMESEL/FILTERED"
}

const defaultState = {
  timeSelValue: "Empty",
  timeSel: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  week: "0000000000000000",
  filterType: 4
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
        week: action.week,
        filterType: defaultState.filterType
      }
    case "TIMESEL/FILTERED":
      return {
        ...state,
        timeSelValue: "Filtered",
        timeSel: action.timeSel,
        week: action.week,
        filterType: action.filterType
      }
    case "TIMESEL/EMPTY":
      return {
        ...defaultState,
        timeSel: action.timeSel,
      };
    default: 
      return state;
  }
}

const TwoDimArray2Str = (timeSel) => {
  let OneDimArray = [].concat.apply([], timeSel);
  return OneDimArray.join("")
}

const filter = (i, j, mode) => {
  switch(mode) {
    case 'odd': 
      return (((i*4+(j+1)) % 2) == 1);
    case 'even': 
      return (((i*4+(j+1)) % 2) == 0);
    case 'all':
      return true;
  }
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

export const filterTimeSel = (mode, timeSel, dispatch) => {
  let week;
  let filterType = ['odd', 'even', 'all'].indexOf(mode);
  for (let i=0; i<4; i++) {
    for (let j=0; j<4; j++) {
      if (filter(i, j, mode)) {
        timeSel[i][j] = 2;
      } else {
        timeSel[i][j] = 0
      }
    }
  }
  week = TwoDimArray2Str(timeSel);
  return dispatch({ type: actionTypes.FILTERED, timeSel, week, filterType});
}

export const emptyTimeSel = (dispatch) => {
  let timeSel = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  return dispatch({ type: actionTypes.EMPTY, timeSel});
};