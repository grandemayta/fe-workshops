import _page from 'page';

export const loadFeature = path => {
  import(`features/${path}`).then(({ default: Feature }) => {
    const feature = new Feature(document.querySelector('#root'));
    feature.load();
  });
};

export const page = _page;
