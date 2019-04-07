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
      <app-header></app-header>
      <div class="container">
        <input type="text" />
        <textarea></textarea>
        <button>Create course</button>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
