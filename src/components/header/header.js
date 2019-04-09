import { html, render } from 'lit-html';
import './header.scss';

export default class Header extends HTMLElement {
  connectedCallback() {
    render(this.template(), this);
  }

  template() {
    return html`
      <nav class="navbar is-primary is-fixed-top">
        <div class="navbar-brand">
          <div class="navbar-item is-size-5 has-text-weight-bold" href="/">
            <a class="button is-primary" href="/">
              <span class="icon">
                <i class="fas fa-lg fa-laptop-code"></i>
              </span>
              <span class="header-spacing-6 is-size-5">Workshops</span>
            </a>
          </div>
          <a class="navbar-burger"><span></span><span></span><span></span></a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item is-hidden-mobile is-hidden-tablet-only">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-header', Header);
