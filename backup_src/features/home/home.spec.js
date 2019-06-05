import Home from './home';
import config from 'config';

describe('Home', () => {
  const id = 'root';
  let home;

  beforeAll(() => {
    document.body.innerHTML = `
      <div id="${id}"></div>
    `;
    home = new Home(`#${id}`);
  });

  it('home is an instance of Home class', () => {
    expect(home).toBeInstanceOf(Home);
  });

  it.each(['myEl', 'message'])(
    'Constructor should have the following property %s',
    expected => {
      expect(home).toHaveProperty(expected);
    }
  );

  it('Render should upgrade the html with dynamic params', () => {
    const one = sel => document.querySelector(sel);
    let headerTitle = 'Home';
    let message = config.message;
    let cardTitle = 'Start code from here with Vanilla Javascript!';
    let btnText = 'Contacts';
    let btnHref = '/contacts';

    home.render();

    expect(one('#home-header').getAttribute('data-title')).toBe(headerTitle);
    expect(one('.home-title').innerHTML).toBe(message);
    expect(one('#home-card').getAttribute('data-title')).toBe(cardTitle);
    expect(one('#home-button').getAttribute('data-text')).toBe(btnText);
    expect(one('#home-button').getAttribute('data-href')).toBe(btnHref);
  });

  afterAll(() => {
    home = null;
  });
});
