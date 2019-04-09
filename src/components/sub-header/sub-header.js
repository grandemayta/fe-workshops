import { html, render } from 'lit-html';

export default class SubHeader extends HTMLElement {
  get title() {
    return this.getAttribute('title');
  }

  connectedCallback() {
    render(this.template(), this);
  }

  template() {
    return html`
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              ${this.title}
            </h1>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('app-sub-header', SubHeader);
