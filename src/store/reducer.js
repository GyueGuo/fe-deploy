export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.data,
      };
    default:
      return state;
  }
}
