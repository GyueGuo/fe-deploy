import { setStorage } from '../utils/storage';

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_CHART_RECORD':
      setStorage('chatRecord', JSON.stringify(action.data));
      return {
        ...state,
        chatRecord: action.data,
      };
    default:
      return state;
  }
}
