export const disableFieldset = (el, selector) => {
  const fieldsetEl = el.querySelector(selector);
  fieldsetEl.setAttribute('disabled', true);
};
