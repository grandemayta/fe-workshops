import { html, render } from 'lit-html';
import { signup } from 'utils/http-wrapper';

export default class Signup {
  constructor(el) {
    this.el = el;
    this.canSubmit = true;
    this.params = {
      firstname: '',
      lastname: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    };
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.params[name] = value;
  }

  disableForm() {
    const signupForm = this.el.querySelector('#signup-disabled');
    signupForm.setAttribute('disabled', true);
  }

  showAlert(status, message) {
    const containerAlertEl = this.el.querySelector('#signup-alert');
    const alertEl = containerAlertEl.querySelector('app-alert');

    alertEl.setAttribute('status', status);
    alertEl.setAttribute('message', message);
    containerAlertEl.classList.remove('is-hidden');

    if (status === 'success') {
      this.canSubmit = false;
      this.disableForm();
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    if (this.canSubmit) {
      const { confirmEmail, confirmPassword, ...params } = this.params;
      const response = await signup(params);
      let status = 'success';

      if (response.ko) status = 'danger';
      this.showAlert(status, response.message);
    }
  }

  template() {
    return html`
      <app-header></app-header>
      <app-sub-header title="Signup"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <div id="signup-alert" class="columns is-centered is-hidden">
            <div class="column">
              <app-alert status message></app-alert>
            </div>
          </div>
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
                  <a @click=${e => this.onSubmit(e)} class="button is-medium is-primary">
                    Signup
                  </a>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </section>
    `;
  }

  load() {
    render(this.template(), this.el);
  }
}
