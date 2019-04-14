import { html, render } from 'lit-html';

export default class Alert extends HTMLElement {
  static get observedAttributes() {
    return ['status', 'message'];
  }

  get status() {
    return this.getAttribute('status');
  }

  get message() {
    return this.getAttribute('message');
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== null && newValue !== null) {
      render(this.template(), this);
    }
  }

  template() {
    return html`
      <article class="message is-${this.status}">
        <div class="message-body">
          ${this.message}
        </div>
      </article>
    `;
  }
}

customElements.define('app-alert', Alert);
