import { config } from './config.service';

export const addAttendeeToWorkshop = (workshopId, userId) => {
  const params = { method: 'POST' };
  return config(`workshops/${workshopId}/attendees/${userId}`, params);
};

export const removeAttendeeFromWorkshop = (workshopId, userId) => {
  const params = { method: 'PUT' };
  return config(`workshops/${workshopId}/attendees/${userId}`, params);
};

export const attendeeWorkshops = userId => {
  return config(`attendees/${userId}/workshops`);
};
