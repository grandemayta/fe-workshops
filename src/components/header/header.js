import { html, render } from 'lit-html';
import { getUserSession, removeUserSession } from 'utils/session-wrapper';
import { page } from 'utils/page-features';
import './header.scss';

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.userIsLogged = false;
  }

  onLogout() {
    removeUserSession();
    page('/login');
  }

  checkIfUserIsLogged() {
    const userSession = getUserSession();
    if (userSession) {
      this.userIsLogged = true;
    }
  }

  connectedCallback() {
    // @TODO handle menu stikcuy with 'is-fixed-top'
    this.checkIfUserIsLogged();
    render(this.template(), this);
  }

  loggedTemplate() {
    return html`
      <div class="navbar-end is-hidden-mobile is-hidden-tablet-only">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <img class="header-img-rounded" src="https://via.placeholder.com/150" />
          </a>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item" href="/profile">
              Profile
            </a>
            <a class="navbar-item">
              Your workshops
            </a>
            <a class="navbar-item" href="/courses/create">
              Create a workshop
            </a>
            <a class="navbar-item">
              Your events
            </a>
            <hr class="navbar-divider" />
            <a @click=${e => this.onLogout(e)} class="navbar-item">
              Logout
            </a>
          </div>
        </div>
      </div>
    `;
  }

  unloggedTemplate() {
    return html`
      <div class="navbar-end is-hidden-mobile is-hidden-tablet-only">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="/signup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/login">
              Log in
            </a>
          </div>
        </div>
      </div>
    `;
  }

  template() {
    return html`
      <nav class="navbar is-primary">
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
        ${this.userIsLogged ? this.loggedTemplate() : this.unloggedTemplate()}
      </nav>
    `;
  }
}

customElements.define('app-header', Header);
