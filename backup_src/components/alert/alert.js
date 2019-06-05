import { html, render } from 'lit-html';
import { scrollTo } from 'helpers';

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
      scrollTo();
    }
  }

  template() {
    return html`
      <div class="columns is-centered">
        <div class="column">
          <article class="message is-${this.status}">
            <div class="message-body">
              ${this.message}
            </div>
          </article>
        </div>
      </div>
    `;
  }
}

customElements.define('app-alert', Alert);
