import { html, render } from 'lit-html';

export default class Hashtag {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.params.title(`#${this.params.hashtag}`);
  }

  template() {
    return html`
      <div class="container">
        <app-tiles-courses
          type="hashtag"
          value=${this.params.hashtag}
        ></app-tiles-courses>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
