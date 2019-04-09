import { html, render } from 'lit-html';

export default class CreateCourse extends HTMLElement {
  get title() {
    return this.getAttribute('type');
  }

  connectedCallback() {
    render(this.template(), this);
  }

  template() {
    return html`
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label is-medium">Title</label>
            <input class="input is-medium" placeholder="Type your title..." />
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label is-medium">Description</label>
            <div class="control">
              <textarea
                class="textarea is-medium"
                placeholder="Type your description"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="field">
            <label class="label is-medium">Date</label>
            <input class="input is-medium" placeholder="DD-MM-YYY" />
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label is-medium">Photo</label>
            <div class="file is-medium is-primary">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Upload
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <p class="control">
          <a class="button is-medium is-primary">
            Send
          </a>
        </p>
        <p class="control">
          <a class="button is-medium is-light" href="/">
            Cancel
          </a>
        </p>
      </div>
    `;
  }
}

customElements.define('app-create-course', CreateCourse);
