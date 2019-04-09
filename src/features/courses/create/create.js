import { html, render } from 'lit-html';
import './create.scss';

export default class Create {
  constructor(el) {
    this.el = el;
  }

  template() {
    return html`
      <app-header></app-header>
      <app-sub-header title="Create a workshop"></app-sub-header>
      <div class="container">
        <app-create-course type="create"></app-create-course>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
