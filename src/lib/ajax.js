import storage from './storage';
import { env } from '../config';
import axios from 'axios';
import Vue from 'vue';
import router from '../router';

export default function ajax(api, method = 'get', data = null, prefix = null) {
  // api地址
  let url = `${prefix || env.api}/${api}`;
  return new Promise((resolve, reject) => {
    const headers = {
      // 'Content-Type': 'application/json',
      // Accept: 'application/json',
      // Device: 'h5',
      // Joke: 'meibai!',
    };

    // const token = storage.get('token');
    // if (token) headers.Authorization = token;

    // if (prefix) {
    //   delete headers.Authorization;
    //   delete headers.Joke;
    //   delete headers.Device;
    // }

    const token = storage.get('token');
    console.log(token, 'token');
    if (token) headers.key = token;

    if (prefix) {
      delete headers.key;
      delete headers.Joke;
      delete headers.Device;
    }

    axios({
      headers,
      method,
      url,
      [method === 'get' ? 'params' : 'data']: data,
    })
      .then(response => response.data)
      .then(data => {
        if (data.api_code !== 200) {
          Vue.prototype.$toast(data.api_msg, 2500, {
            color: '#ffffff',
            backgroundColor: 'rgba(244, 104, 104, .8)',
          });
        }
        if (data.api_code === 200) {
          resolve(data);
        } else if (data.api_code === 599 || data.api_code === 598) {
          // 重新登录处理
          storage.remove('token');
          router.push('/teacher/login');
        } else {
          reject(data);
          // resolve(data);
          // console.error(data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
}
