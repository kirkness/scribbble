
import request from 'superagent';

const HttpClient = {

  get: path => new Promise((resolve, reject) => {
    request
      .get(path)
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject(res.body ? res.body : err);
        } else {
          resolve(res.body);
        }
      });
  }),


  post: (path, opts = {}) => new Promise((resolve, reject) => {
    request
      .post(path)
      .send(opts.data || {})
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject((res.body ? res.body : err));
        } else {
          resolve(res.body);
        }
      });
  }),


  put: (path, opts = {}) => new Promise((resolve, reject) => {
    request
      .put(path)
      .send(opts.data || {})
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          reject((res.body ? res.body : err));
        } else {
          resolve(res.body);
        }
      });
  }),


};

export default HttpClient;
