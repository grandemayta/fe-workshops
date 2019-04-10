const BASE_URL = 'http://localhost:8080/api/v1';

const getResponse = async endpoint => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) return { message: 'Opss, something is wrong!' };
  return response.json();
};

export const getCourses = () => {
  return getResponse(`courses`);
};

export const getCourseById = id => {
  return getResponse(`courses/${id}`);
};

export const getAttendees = () => {
  return getResponse(`attendees`);
};
