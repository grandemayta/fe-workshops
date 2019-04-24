export const setMessage = (message, status = 'success') => {
  const alertEl = document.querySelector('app-alert');
  alertEl.setAttribute('status', status);
  alertEl.setAttribute('message', message);
};
