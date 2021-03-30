export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_CHART_RECORD':
      sessionStorage.setItem('chartRecord', JSON.stringify(action.data));
      return {
        ...state,
        chartRecord: action.data,
      };
    default:
      return state;
  }
}
