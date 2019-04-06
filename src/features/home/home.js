import { html, render } from 'lit-html';
import Router from 'core/router';
import 'features/home/home.scss';

export default class Home {
  constructor(el) {
    this.el = el;
    this.router = new Router();
  }

  template() {
    return html`
      <app-card
        title="Start code from here with Vanilla Javascript!"
        link="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      >
      </app-card>
      <button @click=${() => this.router.go('/contacts')}>Contacts</button>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
