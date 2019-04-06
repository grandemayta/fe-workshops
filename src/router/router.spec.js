import Router from './router';

describe('Router component', () => {
  let router;

  beforeAll(() => {
    router = new Router();
  });

  it('router is an instance of Router class', () => {
    expect(router).toBeInstanceOf(Router);
  });

  it.each(['root', 'useHash', 'hash', 'router'])(
    'Constructor should have the following property %s',
    expected => {
      expect(router).toHaveProperty(expected);
    }
  );

  it('go() should have been called', () => {
    const goMock = jest.spyOn(router, 'go');
    router.go('/contacts');
    expect(goMock).toHaveBeenCalled();
  });

  it('bootstrap() should have been called', () => {
    const bootstrapMock = jest.spyOn(router, 'bootstrap');
    router.bootstrap('/contacts');
    expect(bootstrapMock).toHaveBeenCalled();
  });

  afterAll(() => {
    router = null;
  });
});
