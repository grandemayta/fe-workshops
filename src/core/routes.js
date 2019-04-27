import page from 'page';
import { route } from './route';

const routes = () => {
  page('/', context => route('home/home', context));
  page('/signup', context => route('auth/signup/signup', context));
  page('/login', context => route('auth/login/login', context));
  page('/hashtag/:hashtag', context => route('hashtag/hashtag', context));
  page('/courses/create', context => route('courses/create/create', context));
  page('/courses/update/:id', context => route('courses/update/update', context));
  page('/courses/detail/:id', context => route('courses/detail/detail', context));
  page('/profile', context => route('profile/profile', context));
  page('/speaker/:speakerId/workshops', context =>
    route('speaker/workshops/workshops', context)
  );
  page('/attendee/:userId/workshops', context =>
    route('attendee/workshops/workshops', context)
  );
  page({ hashbang: true });
};

export default routes;
