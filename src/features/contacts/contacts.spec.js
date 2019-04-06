import Contacts from './contacts';

describe('Contacts', () => {
  const id = 'root';
  let contacts;

  beforeAll(() => {
    document.body.innerHTML = `
      <div id="${id}"></div>
    `;
    contacts = new Contacts(`#${id}`);
  });

  it('home is an instance of Home class', () => {
    expect(contacts).toBeInstanceOf(Contacts);
  });

  it('Constructor should have the following property myEl', () => {
    expect(contacts).toHaveProperty('myEl');
  });

  it('Render should upgrade the html with dynamic params', () => {
    const one = sel => document.querySelector(sel);
    let headerTitle = 'Contacts';
    let cardTitle = 'You are in Contacts Page!';
    let btnText = 'Go Back';
    let btnHref = '/';

    contacts.render();

    expect(one('#contacts-header').getAttribute('data-title')).toBe(headerTitle);
    expect(one('#contacts-card').getAttribute('data-title')).toBe(cardTitle);
    expect(one('#contacts-button').getAttribute('data-text')).toBe(btnText);
    expect(one('#contacts-button').getAttribute('data-href')).toBe(btnHref);
  });

  afterAll(() => {
    contacts = null;
  });
});
