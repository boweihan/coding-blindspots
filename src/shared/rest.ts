import axios from 'axios';
import config from '../config';

const get = (path: string) => {
   console.log("get method input string is " + path);
  return axios
    .get(`${config.baseUrl}${path}`)
    .then((response) => {
     console.log("inside get method. response is " + response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("get call failed");
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
      console.log("post call failed");
      console.log(error);
    });
};

export default { get, post };
