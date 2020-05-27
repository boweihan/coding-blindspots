import axios from 'axios';
import config from '../config';

const proxyconfig = {proxy: { host: '127.0.0.1', port: 8000}};
const get = (path: string) => {
  return axios
    .get(`${config.baseUrl}${path}`, proxyconfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};



const post = (path: string, body: object) => {
  return axios
    .post(`${config.baseUrl}${path}`, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { get, post};
