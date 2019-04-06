export const loadFeature = feature => {
  import(`features/${feature}/${feature}`).then(({ default: Feature }) => {
    const feature = new Feature(document.querySelector('#root'));
    feature.load();
  });
};
