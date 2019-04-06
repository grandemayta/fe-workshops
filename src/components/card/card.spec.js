import Component from './component';

describe('My component', () => {
  let componentId = 'root';
  let title = 'Start code from here with Vanilla Javascript!';
  let component;

  document.body.innerHTML = `
    <div id="${componentId}" data-title="${title}"></div>
  `;

  beforeAll(() => {
    component = new Component(`#${componentId}`);
  });

  it('component is an instance of Component class', () => {
    expect(component).toBeInstanceOf(Component);
  });

  it.each(['myEl', 'data.title', 'data.message', 'data.href', 'data.image'])(
    'Constructor should have the following property %s',
    expected => {
      expect(component).toHaveProperty(expected);
    }
  );

  it('Click should have been called', () => {
    const spyClick = jest.spyOn(component, 'click');
    component.click();
    expect(spyClick).toHaveBeenCalled();
  });

  it('Render should upgrade the html with dynamic params', () => {
    component.render();
    expect(document.querySelector('#root').getAttribute('data-title')).toBe(title);
  });

  afterAll(() => {
    component = null;
  });
});
