import { html, render } from 'lit-html';
import { signin } from 'utils/http-wrapper';
import { setUserSession } from 'utils/session-wrapper';
import { page } from 'utils/page-features';

export default class Login {
  constructor(el) {
    this.el = el;
    this.params = { email: '', password: '' };
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.params[name] = value;
  }

  showAlert(status, message) {
    const containerAlertEl = this.el.querySelector('#signin-alert');
    const alertEl = containerAlertEl.querySelector('app-alert');

    alertEl.setAttribute('status', status);
    alertEl.setAttribute('message', message);
    containerAlertEl.classList.remove('is-hidden');
  }

  async onLogin(e) {
    e.preventDefault();
    const response = await signin(this.params);

    if (response.ko) {
      this.showAlert('danger', response.message);
    } else {
      setUserSession(response);
      page('/');
    }
  }

  template() {
    return html`
      <app-header></app-header>
      <app-sub-header title="Signin"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <div id="signin-alert" class="columns is-centered is-hidden">
            <div class="column">
              <app-alert status message></app-alert>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-5">
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
          <div class="columns is-centered">
            <div class="column is-5">
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
          <div class="columns is-centered">
            <div class="column is-5">
              <div class="field is-grouped is-grouped-right">
                <a @click=${e => this.onLogin(e)} class="button is-medium is-primary">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
