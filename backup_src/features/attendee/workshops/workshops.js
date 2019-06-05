import { html, render } from 'lit-html';

export default class Workshops {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.params.title('My events');
  }

  template() {
    return html`
      <div class="container">
        <app-tiles-courses
          type="attendee"
          speaker=${this.params.userId}
        ></app-tiles-courses>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
