import { config } from './config.service';

export const signin = payload => {
  const params = { method: 'POST', body: payload };
  return config(`signin`, params);
};

export const signup = payload => {
  const params = { method: 'POST', body: payload };
  return config(`signup`, params);
};

export const updateProfile = (userId, payload) => {
  const params = { method: 'PUT', body: payload };
  return config(`user/${userId}`, params);
};
