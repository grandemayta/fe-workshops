import page from 'page';
import { route } from './route';

export const routes = () => {
  page('/', context => route('home', context));
  page('/contacts', context => route('contacts', context));
  page();
};
