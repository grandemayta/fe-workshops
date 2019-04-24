export const setProgressBar = (status = 'disabled') => {
  const progressBarEl = document.querySelector('app-progress-bar');
  progressBarEl.setAttribute('status', status);
};
