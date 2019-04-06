export default {
  '/': () => {
    import(/* webpackChunkName: "home" */ './features/home/home').then(
      ({ default: Home }) => {
        new Home('#root').render();
      }
    );
  },
  '/contacts': () => {
    import(/* webpackChunkName: "contacts" */ './features/contacts/contacts').then(
      ({ default: Contacts }) => {
        new Contacts('#root').render();
      }
    );
  }
};
