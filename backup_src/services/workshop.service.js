import { config } from './config.service';

export const workshops = () => {
  return config(`workshops`);
};

export const workshopById = workshopId => {
  return config(`workshops/${workshopId}`);
};

export const workshopsByHashtag = technology => {
  return config(`workshops?technology=${technology}`);
};

export const workshopsBySpeaker = userId => {
  return config(`workshops/speaker/${userId}`);
};

export const workshopAttendees = workshopId => {
  return config(`workshops/${workshopId}/attendees`);
};

export const createWorkshop = payload => {
  const params = { method: 'POST', body: payload };
  return config(`workshops`, params);
};

export const updateWorkshop = (workshopId, payload) => {
  const params = { method: 'PUT', body: payload };
  return config(`workshops/${workshopId}`, params);
};
