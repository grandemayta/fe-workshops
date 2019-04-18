import { setMessage } from 'utils/alert';
const BASE_URL = 'http://localhost:1337';

const getResponse = (endpoint, params = {}) => {
  if (params.body) params.body = JSON.stringify(params.body);
  return new Promise((resolve, reject) => {
    return fetch(`${BASE_URL}/${endpoint}`, params)
      .then(response => {
        if (response.ok) return response.json();
        reject(new Error(setMessage(response.statusText, 'danger')));
      })
      .then(data => resolve(data));
  });
};

export const getWorkshops = () => {
  return getResponse(`workshops`);
};

export const getWorkshopById = workshopId => {
  return getResponse(`workshops/${workshopId}`);
};

export const getWorkshopsBySpeaker = speakerId => {
  return getResponse(`workshops/speaker/${speakerId}`);
};

export const getAttendeesByWorkshop = workshopId => {
  return getResponse(`workshops/${workshopId}/attendees`);
};

export const addWorkshop = payload => {
  const params = { method: 'POST', body: payload };
  return getResponse(`workshops`, params);
};

export const updateWorkshopById = (workshopId, payload) => {
  const params = { method: 'PUT', body: payload };
  return getResponse(`workshops/${workshopId}`, params);
};

export const signup = payload => {
  const params = { method: 'POST', body: payload };
  return getResponse(`signup`, params);
};

export const signin = payload => {
  const params = { method: 'POST', body: payload };
  return getResponse(`signin`, params);
};

export const updateProfile = (id, payload) => {
  const params = { method: 'PUT', body: payload };
  return getResponse(`user/${id}`, params);
};
