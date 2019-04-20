import { html, render } from 'lit-html';

export default class Create {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.params.title('Create your workshop');
  }

  template() {
    return html`
      <div class="container">
        <app-alert status message></app-alert>
        <app-create-course
          type="create"
          speaker=${this.params.userSession.id}
        ></app-create-course>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
