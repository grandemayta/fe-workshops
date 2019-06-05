import { html, render } from 'lit-html';

export default class Workshops {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.params.title('My workshops');
  }

  template() {
    return html`
      <div class="container">
        <app-tiles-courses
          type="speaker"
          speaker=${this.params.speakerId}
        ></app-tiles-courses>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
