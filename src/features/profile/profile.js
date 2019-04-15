import { html, render } from 'lit-html';
import { updateProfile } from 'utils/http-wrapper';
import { setUserSession } from 'utils/session-wrapper';

export default class Profile {
  constructor(el, params) {
    this.el = el;
    this.params = params;
    this.requestData = {
      avatar: params.userSession.avatar,
      nickname: '',
      role: ''
    };
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.requestData[name] = value;
  }

  showAlert(status, message) {
    const containerAlertEl = this.el.querySelector('#profile-alert');
    const alertEl = containerAlertEl.querySelector('app-alert');

    alertEl.setAttribute('status', status);
    alertEl.setAttribute('message', message);
    containerAlertEl.classList.remove('is-hidden');
  }

  async onUpdateProfile(e) {
    e.preventDefault();
    const { id } = this.params.userSession;
    const response = await updateProfile(id, this.requestData);
    let status = 'success';

    if (response.ko) status = 'danger';
    this.showAlert(status, response.message);
    if (status === 'success') setUserSession(response.data);
  }

  template() {
    const { firstname, lastname, email, avatar, role } = this.params.userSession;
    const name = `${firstname} ${lastname}`;

    return html`
      <app-header></app-header>
      <app-sub-header title="Profile"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <div id="profile-alert" class="columns is-centered is-hidden">
            <div class="column">
              <app-alert status message></app-alert>
            </div>
          </div>
          <div class="columns is-centered is-spacing-20">
            <div class="column is-4">
              <figure class="image is-128x128 is-margin-centered">
                <img class="is-rounded" src=${avatar} />
              </figure>
            </div>
          </div>
          <div class="columns is-centered is-spacing-40">
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input class="input is-medium" type="text" value=${name} disabled />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input class="input is-medium" type="text" value=${email} disabled />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    @keyup=${e => this.onKeyup(e)}
                    name="nickname"
                    class="input is-medium"
                    type="text"
                    placeholder="Nickname"
                  />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-at"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    @keyup=${e => this.onKeyup(e)}
                    name="role"
                    class="input is-medium"
                    type="text"
                    value=${role}
                    placeholder="Role"
                  />
                  <span class="icon is-medium is-left">
                    <i class="fas fa-briefcase"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-centered is-spacing-20">
            <div class="column is-8">
              <div class="field is-grouped is-grouped-right">
                <a
                  @click=${e => this.onUpdateProfile(e)}
                  class="button is-medium is-primary"
                >
                  Update Profile
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
