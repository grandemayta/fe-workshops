import page from 'page';
import { route } from './route';

export const routes = () => {
  page('/', context => route('home', 'home/home', context));
  page('/courses/detail/:id', context =>
    route('courses-detail', 'courses/detail/detail', context)
  );
  page();
};
