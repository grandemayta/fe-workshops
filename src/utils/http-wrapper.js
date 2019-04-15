const BASE_URL = 'http://localhost:1337';

const getResponse = async (endpoint, params) => {
  if (params.body) params.body = JSON.stringify(params.body);
  const response = await fetch(`${BASE_URL}/${endpoint}`, params);
  if (!response.ok) return { ko: true, message: 'Opss, something was wrong!' };
  return response.json();
};

export const getWorkshops = () => {
  return getResponse(`workshops`, { method: 'GET' });
};

export const getWorkshopById = workshopId => {
  return getResponse(`workshops/${workshopId}`, { method: 'GET' });
};

export const getAttendeesByWorkshop = workshopId => {
  return getResponse(`workshops/${workshopId}/attendees`, { method: 'GET' });
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
