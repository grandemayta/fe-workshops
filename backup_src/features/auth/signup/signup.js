import { html, render } from 'lit-html';
import { signup } from 'services';
import { setMessage, disableFieldset } from 'helpers';

export default class Signup {
  constructor(el, config) {
    this.el = el;
    this.canSubmit = true;
    config.title('Signup');
    this.params = {};
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.params[name] = value;
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.canSubmit) {
      const { confirmEmail, confirmPassword, ...params } = this.params;
      const response = await signup(params);
      setMessage(response.message);
      disableFieldset(this.el, '#signup-disabled');
      this.canSubmit = false;
    }
  }

  template() {
    return html`
      <div class="container">
        <app-alert status message></app-alert>
        <fieldset id="signup-disabled">
          <div class="columns is-centered is-spacing-10">
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    @keyup=${e => this.onKeyup(e)}
                    name="firstname"
                    class="input is-medium"
                    type="text"
                    placeholder="Firtname"
                  />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    @keyup=${e => this.onKeyup(e)}
                    name="lastname"
                    class="input is-medium"
                    type="text"
                    placeholder="Lastname"
                  />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-user"></i>
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
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    @keyup=${e => this.onKeyup(e)}
                    name="confirmEmail"
                    class="input is-medium"
                    type="text"
                    placeholder="Confirm Email"
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
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    @keyup=${e => this.onKeyup(e)}
                    name="confirmPassword"
                    class="input is-medium"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-centered is-spacing-20">
            <div class="column is-8">
              <div class="field is-grouped is-grouped-right">
                <a @click=${e => this.onSubmit(e)} class="button is-medium is-link">
                  Signup
                </a>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
