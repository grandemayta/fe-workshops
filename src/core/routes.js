import { page, loadFeature } from 'utils';

const routes = () => {
  page('/', () => loadFeature('home'));
  page('/contacts', () => loadFeature('contacts'));
  page();
};

export default routes;
