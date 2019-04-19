import { html, render } from 'lit-html';
import { updateProfile } from 'utils/http-wrapper';
import { setUserSession } from 'utils/session-wrapper';
import { setMessage } from 'utils/alert';

export default class Profile {
  constructor(el, params) {
    this.el = el;
    this.params = params.userSession;
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.params[name] = value;
  }

  async onUpdateProfile(e) {
    e.preventDefault();
    const { id } = this.params;
    const response = await updateProfile(id, this.params);
    setMessage(response.message);
    setUserSession(response.data);
  }

  template() {
    const { firstname, lastname, email, avatar, role } = this.params;
    const name = `${firstname} ${lastname}`;

    return html`
      <app-header></app-header>
      <app-sub-header title="Profile"></app-sub-header>
      <section class="main-wrapper">
        <div class="container">
          <app-alert status message></app-alert>
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
