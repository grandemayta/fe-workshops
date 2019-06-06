import { getUserSession } from '../helpers/index';

export const route = (name: string, path: string, context: any) => {
  import(`../features/${path}`).then(() => {
    context.params.userSession = getUserSession();
    const params = JSON.stringify(context.params);
    const appMainEl = document.querySelector('app-main#root');
    appMainEl.innerHTML = `<app-${name} params=${params}></app-${name}>`;
  });
};
