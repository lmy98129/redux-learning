const actionTypes = {
  INIT: "TIMESEL/INIT",
  EDIT: "TIMESEL/EDIT",
  EMPTY: "TIMESEL/EMPTY",
  FILTERED: "TIMESEL/FILTERED",
  SAVE: "TIMESEL/SAVE",
  CANCEL: "TIMESEL/CANCEL"
}

const defaultState = {
  timeSelValue: "Empty",
  timeSel: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  editingTimeSel: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  week: "0000000000000000",
  editingWeek: "0000000000000000",
  filterType: 4
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case "TIMESEL/INIT": 
      return {
        ...state,
        timeSelValue: "Init",
        timeSel: action.timeSel,
        week: action.week,
        editingWeek: action.week,
        editingTimeSel: action.editingTimeSel,
      }
    case "TIMESEL/EDIT":
      return {
        ...state,
        timeSelValue: "Edit",
        editingTimeSel: action.newEditingTimeSel,
        editingWeek: action.week,
        filterType: defaultState.filterType,
      }
    case "TIMESEL/SAVE":
      return {
        ...state,
        timeSelValue: "Save",
        timeSel: state.editingTimeSel,
        week: action.editingWeek,
        filterType: defaultState.filterType,
      }
    case "TIMESEL/CANCEL":
      return {
        ...state,
        timeSelValue: "Cancel",
        editingTimeSel: state.timeSel
      }
    case "TIMESEL/FILTERED":
      return {
        ...state,
        timeSelValue: "Filtered",
        editingTimeSel: action.newTimeSel,
        editingWeek: action.week,
        filterType: action.filterType
      }
    case "TIMESEL/EMPTY":
      return {
        ...defaultState,
        timeSel: action.timeSel,
        editingTimeSel: action.timeSel
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
  let timeStrArr = [], timeSel = [], editingTimeSel = [], week;
  timeStrArr = timeString.split("");
  for (let i=0; i<4; i++) {
    timeSel.push([]);
    for (let j=0; j<4; j++) {
      timeSel[i].push(parseInt(timeStrArr.shift()));
    }
  }
  week = TwoDimArray2Str(timeSel);
  editingTimeSel = timeSel.slice(0);
  return dispatch({ type: actionTypes.INIT, timeSel, editingTimeSel, week });
}

export const editTimeSel = (row, col, editingTimeSel, status, dispatch) => {
  let week, newEditingTimeSel;
  newEditingTimeSel = JSON.parse(JSON.stringify(editingTimeSel));
  newEditingTimeSel[row][col] = status;
  week = TwoDimArray2Str(newEditingTimeSel);
  return dispatch({ type: actionTypes.EDIT, newEditingTimeSel, week });
}

export const saveTimeSel = (editingWeek, dispatch) => {
  return dispatch({ type: actionTypes.SAVE, editingWeek });
}

export const cancelTimeSel = (dispatch) => {
  return dispatch({type: actionTypes.CANCEL});
}

export const filterTimeSel = (mode, timeSel, dispatch) => {
  let week, newTimeSel = [];
  newTimeSel = JSON.parse(JSON.stringify(timeSel));
  let filterType = ['odd', 'even', 'all'].indexOf(mode);
  for (let i=0; i<4; i++) {
    for (let j=0; j<4; j++) {
      if (filter(i, j, mode)) {
        newTimeSel[i][j] = 2;
      } else {
        newTimeSel[i][j] = 0
      }
    }
  }
  week = TwoDimArray2Str(newTimeSel);
  return dispatch({ type: actionTypes.FILTERED, newTimeSel, week, filterType});
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