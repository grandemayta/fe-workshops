import { getUserSession } from 'helpers';

const handleSubHeader = (eventName, detail) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
};

export const route = (path, context) => {
  import(`features/${path}`).then(({ default: Feature }) => {
    const { params, path } = context;

    if (path === '/') {
      handleSubHeader('subheader:disable');
    } else {
      params.title = title => handleSubHeader('subheader:enable', { title });
    }
    params.userSession = getUserSession();
    const feature = new Feature(document.querySelector('#root'), params);
    feature.load();
  });
};
