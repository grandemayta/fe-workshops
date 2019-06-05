import { customElement, html, LitElement } from 'lit-element';

@customElement('app-home')
class Home extends LitElement {
  constructor() {
    super();
  }

  public render() {
    return html`
      <app-greetings fullname="Charlotte"></app-greetings>
      <a href="/contacts">Contacts</a>
    `;
  }
}

export default Home;
