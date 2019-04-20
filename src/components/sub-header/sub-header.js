import { html, render } from 'lit-html';

export default class SubHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    document.addEventListener('subheader:disable', () => {
      this.title = '';
    });
    document.addEventListener('subheader:enable', e => {
      this.title = e.detail.title;
    });
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(title) {
    this.setAttribute('title', title);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== null && newValue !== null) {
      render(this.template(), this);
    }
  }

  template() {
    return html`
      <section class="hero is-link ${this.title === '' ? 'is-hidden' : ''}">
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
