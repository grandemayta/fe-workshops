import { setMessage } from 'helpers';
import { setProgressBar } from 'helpers';

const BASE_URL = 'http://localhost:1337';

export const config = (endpoint, params = {}) => {
  if (params.body) params.body = JSON.stringify(params.body);
  return new Promise((resolve, reject) => {
    setProgressBar('enabled');
    return fetch(`${BASE_URL}/${endpoint}`, params)
      .then(response => {
        if (response.ok) return response.json();
        setProgressBar();
        reject(new Error(setMessage(response.statusText, 'danger')));
      })
      .then(data => {
        setProgressBar();
        resolve(data);
      });
  });
};
