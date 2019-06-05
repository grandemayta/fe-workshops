import { html, render } from 'lit-html';
import './home.scss';

export default class Home {
  constructor(el) {
    this.el = el;
  }

  template() {
    return html`
      <div class="container">
        <app-tiles-courses type="all"></app-tiles-courses>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
