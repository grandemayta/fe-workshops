import { html, render } from 'lit-html';

export default class Create {
  constructor(el, params) {
    this.el = el;
    this.params = params;
  }

  template() {
    return html`
      <app-header></app-header>
      <app-sub-header title="Create a workshop"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <app-create-course type="create"></app-create-course>
        </div>
      </section>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
