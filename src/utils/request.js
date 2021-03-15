import axios from 'axios';

const baseUrl = 'https://www.tongchengby.vip';

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
