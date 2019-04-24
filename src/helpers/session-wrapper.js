import Cookies from 'js-cookie';

export const setUserSession = params => {
  Cookies.set('workshopsSession', JSON.stringify(params));
};

export const removeUserSession = () => {
  Cookies.remove('workshopsSession');
};

export const getUserSession = () => {
  return Cookies.getJSON('workshopsSession');
};
