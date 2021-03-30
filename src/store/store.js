let chartRecord = null;
if (sessionStorage.getItem('chartRecord')) {
  chartRecord = JSON.parse(sessionStorage.getItem('chartRecord'));
}
export default {
  chartRecord,
};
