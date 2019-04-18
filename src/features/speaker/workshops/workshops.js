import { html, render } from 'lit-html';

export default class Workshops {
  constructor(el, params) {
    this.el = el;
    this.params = params;
  }

  template() {
    return html`
      <app-header></app-header>
      <app-sub-header title="My workshops"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <app-tiles-courses
            type="speaker"
            speaker=${this.params.speakerId}
          ></app-tiles-courses>
        </div>
      </section>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
