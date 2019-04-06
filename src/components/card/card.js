import { html, render } from 'lit-html';
import './card.scss';
import image from 'assets/js.svg';
import config from 'config';

export default class CardComponent extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'link'];
  }

  get title() {
    return this.getAttribute('title');
  }

  get link() {
    return this.getAttribute('link');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = {
      title: this.title,
      link: this.link,
      message: config.message,
      image
    };
  }

  openWindow() {
    window.open(this.data.link, true);
  }

  template() {
    const { title, message, image } = this.data;
    return html`
      <div class="card">
        <h1>${title}</h1>
        <h2>${message}</h2>
        <img src=${image} />
        <button @click=${() => this.openWindow()}>Learn JS</button>
      </div>
    `;
  }

  connectedCallback() {
    console.log('Card Component Inserted');
    render(this.template(), this.shadowRoot);
  }
}

customElements.define('app-card', CardComponent);
