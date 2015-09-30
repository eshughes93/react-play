/*
Define a client to ....
access the backend
*/

import agent from 'superagent-promise';
import superagent from 'superagent';
const request = agent(superagent, Promise);
export default class Client {
  get(path) {
    return request.get(`/api${path}`);
  }
  post(path, data) {
    return request.post(`/api${path}`, data);
  }
  put(path, data) {
    return request.put(`/api${path}`, data);
  }
}
