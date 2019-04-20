import { html, render } from 'lit-html';
import { signin } from 'utils/http-wrapper';
import { setUserSession } from 'utils/session-wrapper';
import { page } from 'utils/page-features';

export default class Login {
  constructor(el, config) {
    this.el = el;
    config.title('Login');
    this.params = {};
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.params[name] = value;
  }

  async onLogin(e) {
    e.preventDefault();
    const response = await signin(this.params);
    setUserSession(response);
    document.dispatchEvent(new CustomEvent('auth:login'));
    page('/');
  }

  template() {
    return html`
      <div class="container">
        <app-alert status message></app-alert>
        <div class="columns is-centered is-spacing-10">
          <div class="column is-4">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  @keyup=${e => this.onKeyup(e)}
                  name="email"
                  class="input is-medium"
                  type="text"
                  placeholder="Email"
                />
                <span class="icon is-medium is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-centered is-spacing-10">
          <div class="column is-4">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  @keyup=${e => this.onKeyup(e)}
                  name="password"
                  class="input is-medium"
                  type="password"
                  placeholder="Password"
                />
                <span class="icon is-medium is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-centered is-spacing-20">
          <div class="column is-4">
            <div class="field is-grouped is-grouped-right">
              <a @click=${e => this.onLogin(e)} class="button is-medium is-link">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
