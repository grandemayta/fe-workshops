import { customElement, html, LitElement } from 'lit-element';

@customElement('app-contacts')
class Contacts extends LitElement {
  constructor() {
    super();
  }

  public render() {
    return html`
      <app-greetings fullname="Erika"></app-greetings>
    `;
  }
}

export default Contacts;
