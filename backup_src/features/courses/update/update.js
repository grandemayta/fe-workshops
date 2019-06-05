import { html, render } from 'lit-html';

export default class Update {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.params.title('Update your workshop');
  }

  template() {
    return html`
      <div class="container">
        <app-alert status message></app-alert>
        <app-create-course type="update" id=${this.params.id}></app-create-course>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
