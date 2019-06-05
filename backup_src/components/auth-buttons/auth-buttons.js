import { html, render } from 'lit-html';
import { page, getUserSession, removeUserSession } from 'helpers';

export default class AuthButtons extends HTMLElement {
  constructor() {
    super();
    this.userSession = getUserSession();
    this.userIsLogged = Boolean(this.userSession);
    this.setAttribute('class', 'navbar-end is-hidden-mobile is-hidden-tablet-only');
    this.onLogin();
  }

  onLogin() {
    document.addEventListener('auth:login', () => {
      this.userSession = getUserSession();
      this.userIsLogged = true;
      render(this.template(), this);
    });
  }

  onLogout() {
    removeUserSession();
    this.userIsLogged = false;
    render(this.template(), this);
    page('/login');
  }

  connectedCallback() {
    // @TODO handle menu sticky with 'is-fixed-top'
    render(this.template(), this);
  }

  loggedTemplate() {
    return html`
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <img class="header-img-rounded" src="https://via.placeholder.com/150" />
        </a>
        <div class="navbar-dropdown is-right">
          <a class="navbar-item" href="/profile">
            Profile
          </a>
          <a class="navbar-item" href="speaker/${this.userSession.id}/workshops">
            My workshops
          </a>
          <a class="navbar-item" href="/courses/create">
            Create a workshop
          </a>
          <a class="navbar-item" href="attendee/${this.userSession.id}/workshops">
            Your events
          </a>
          <hr class="navbar-divider" />
          <a @click=${e => this.onLogout(e)} class="navbar-item">
            Logout
          </a>
        </div>
      </div>
    `;
  }

  unloggedTemplate() {
    return html`
      <div class="navbar-end is-hidden-mobile is-hidden-tablet-only">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-link" href="/signup">
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
      ${this.userIsLogged ? this.loggedTemplate() : this.unloggedTemplate()}
    `;
  }
}

customElements.define('app-auth-buttons', AuthButtons);
