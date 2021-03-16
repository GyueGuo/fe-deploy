import axios from 'axios';

console.log(process.env.NODE_ENV);
const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : 'http://www.tongchengby.vip';

function ajax(options) {
  const opt = { method: 'post', ...options };
  if (opt.url.startsWith('/')) {
    opt.url = `${baseUrl}${opt.url}`;
  }
  opt.headers = {
    ...(opt.headers || {}),
    'content-type': 'application/json;charset=utf-8',
  };
  return axios.request(opt);
}

export default ajax;
