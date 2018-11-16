const actionTypes = {
  PAGE_FORWARD: 'ROUTER/PAGE_FORWARD',
  PAGE_BACKWARD: 'ROUTER/PAGE_BACKWARD'
}

export default (state = { routerValue: "", routerHistory: [] }, action) => {
  switch (action.type) {
    case 'ROUTER/PAGE_FORWARD':
      return {
        ...state,
        routerValue: "Forward",
        routerHistory: action.history
      }
    case 'ROUTER/PAGE_BACKWARD': 
      return {
        ...state,
        routerValue: "Backward",
        routerHistory: action.history
      }
    default:
      return state;
  }
}

export const forwardPush = (history, current, dispatch) => {
  history.push(current);
  dispatch({type: actionTypes.PAGE_FORWARD, history});
}

export const backwardPop = (history, dispatch) => {
  dispatch({type: actionTypes.PAGE_BACKWARD, history});
}