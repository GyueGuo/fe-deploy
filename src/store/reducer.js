export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_CHART_RECORD':
      return {
        ...state,
        chartRecord: action.data,
      };
    default:
      return state;
  }
}
