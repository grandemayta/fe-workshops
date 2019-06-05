import { html, render } from 'lit-html';
import './header.scss';

export default class Header extends HTMLElement {
  connectedCallback() {
    // @TODO handle menu sticky with 'is-fixed-top'
    render(this.template(), this);
  }

  template() {
    return html`
      <nav class="navbar is-link">
        <div class="navbar-brand">
          <div class="navbar-item is-size-5 has-text-weight-bold" href="/">
            <a class="button is-link" href="/">
              <span class="icon">
                <i class="fas fa-lg fa-laptop-code"></i>
              </span>
              <span class="header-spacing-6 is-size-5">Workshops</span>
            </a>
          </div>
          <a class="navbar-burger"><span></span><span></span><span></span></a>
        </div>
        <app-auth-buttons></app-auth-buttons>
      </nav>
      <app-sub-header title></app-sub-header>
      <app-progress-bar status></app-progress-bar>
    `;
  }
}

customElements.define('app-header', Header);
