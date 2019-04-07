import { html, render } from 'lit-html';
import header from 'css-loader!./header.css';

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  template() {
    return html`
      <style>
        ${header.toString()}
      </style>
      <header>
        <div class="logo">
          FE Courses
        </div>
      </header>
    `;
  }

  connectedCallback() {
    render(this.template(), this.shadowRoot);
  }
}

customElements.define('app-header', Header);
