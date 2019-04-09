import { html, render } from 'lit-html';
import 'features/contacts/contacts.scss';

export default class Contacts {
  constructor(el) {
    this.el = el;
  }

  template() {
    return html`
      <app-header></app-header>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
