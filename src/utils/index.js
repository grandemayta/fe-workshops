import _page from 'page';

export const loadFeature = (path, context) => {
  import(`features/${path}`).then(({ default: Feature }) => {
    const feature = new Feature(document.querySelector('#root'), context.params);
    feature.load();
  });
};

export const page = _page;
