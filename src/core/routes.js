import { loadFeature } from 'utils';

export default {
  '/': () => loadFeature('home'),
  '/contacts': () => loadFeature('contacts')
};
