import { getUserSession } from '../helpers';

export const route = (name, context) => {
  const path = `${name}/${name}`;
  import(`../features/${path}`).then(({ default: Feature }) => {
    context.params.userSession = getUserSession();
    const el = document.querySelector('#root');
    el.innerHTML = `<app-${name}></app-${name}>`;
    const feature = new Feature(context.params);
    feature.render();
  });
};
