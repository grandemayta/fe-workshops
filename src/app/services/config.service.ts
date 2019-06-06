const BASE_URL = 'https://api-workshops.herokuapp.com';

export const config = (endpoint, params?) => {
  if (params && params.body) {
    params.body = JSON.stringify(params.body);
  }
  return new Promise((resolve, reject) => {
    return fetch(`${BASE_URL}/${endpoint}`, params)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        reject(new Error('Error...'));
      })
      .then(data => {
        resolve(data);
      });
  });
};
