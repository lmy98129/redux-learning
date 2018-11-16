export const actionTypes = {
  PAGE_FORWARD: 'ROUTER/PAGE_FORWARD',
}

export default (state = { routerValue: "" }, action) => {
  switch (action.type) {
    case 'ROUTER/PAGE_FORWARD':
      return {
        ...state,
        routerValue: "Forward",
        history: action.history
      }
    default:
      return state;
  }
}