import _page from 'page';
import { getUserSession } from 'utils/session-wrapper';

export const loadFeature = (path, context) => {
  import(`features/${path}`).then(({ default: Feature }) => {
    const { params } = context;
    params.userSession = getUserSession();
    const feature = new Feature(document.querySelector('#root'), params);
    feature.load();
  });
};

export const page = _page;
