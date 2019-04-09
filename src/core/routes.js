import { page, loadFeature } from 'utils';

const routes = () => {
  page('/', () => loadFeature('home/home'));
  page('/courses/create', () => loadFeature('courses/create/create'));
  page();
};

export default routes;
