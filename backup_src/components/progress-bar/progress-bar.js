import { html, render } from 'lit-html';

export default class ProgressBar extends HTMLElement {
  static get observedAttributes() {
    return ['status'];
  }

  get status() {
    return this.getAttribute('status');
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== null && newValue !== null) {
      const cssClass = this.status === 'enabled' ? '' : 'is-hidden';
      render(this.template(cssClass), this);
    }
  }

  template(cssClass) {
    return html`
      <progress
        class="progress is-small is-info is-radiusless ${cssClass}"
        max="100"
        style="position: absolute;"
      ></progress>
    `;
  }
}

customElements.define('app-progress-bar', ProgressBar);
