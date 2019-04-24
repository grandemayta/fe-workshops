import { page, loadFeature } from 'utils/page-features';

const routes = () => {
  page('/', context => loadFeature('home/home', context));
  page('/hashtag/:hashtag', context => loadFeature('hashtag/hashtag', context));
  page('/courses/create', context => loadFeature('courses/create/create', context));
  page('/courses/update/:id', context => loadFeature('courses/update/update', context));
  page('/courses/detail/:id', context => loadFeature('courses/detail/detail', context));
  page('/signup', context => loadFeature('auth/signup/signup', context));
  page('/login', context => loadFeature('auth/login/login', context));
  page('/profile', context => loadFeature('profile/profile', context));
  page('/speaker/:speakerId/workshops', context =>
    loadFeature('speaker/workshops/workshops', context)
  );
  page('/attendee/:userId/workshops', context =>
    loadFeature('attendee/workshops/workshops', context)
  );
  page();
};

export default routes;
