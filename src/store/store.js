export default {
  token: (window.sessionStorage && sessionStorage.getItem('token')) || '',
  chartRecord: null,
};
