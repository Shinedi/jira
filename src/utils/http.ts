import qs from 'qs';
import * as auth from '../auth-provider';
const apiUrl = process.env.REACT_APP_API_URL; // npm start 的时候读取.env.development,npm run build读.env文件

interface Config extends RequestInit {
  data?: string;
  token?: object;
}
const http = (endPoint: string, {data, token, headers, ...customConfig} : Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-type': data ? 'application/json' : '',
    },
    ...customConfig
  }
  
  if (config.method.toUpperCase() === 'GET') {
    endPoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  window.fetch(`${apiUrl}/${endPoint}`, config).then(async res => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({message: '请重新登录'});
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data)
    }
  })
}
