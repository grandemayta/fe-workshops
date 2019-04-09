import { html, render } from 'lit-html';
import './home.scss';

export default class Home {
  constructor(el) {
    this.el = el;
  }

  template() {
    return html`
      <app-header></app-header>
      <div class="container">
        <a class="button is-primary" href="/contacts">
          Create a Workshop
        </a>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
