import { html, render } from 'lit-html';
import { setMessage, disableFieldset } from 'helpers';
import { workshopById, createWorkshop, updateWorkshop } from 'services';

export default class CreateCourse extends HTMLElement {
  constructor() {
    super();
    this.canSubmit = true;
    this.params = {
      title: '',
      description: '',
      date: '',
      time: '',
      technology: ''
    };
  }

  get type() {
    return this.getAttribute('type');
  }

  get id() {
    return this.getAttribute('id');
  }

  get speaker() {
    return this.getAttribute('speaker');
  }

  onKeyup(e) {
    const { name, value } = e.target;
    this.params[name] = value;
  }

  async connectedCallback() {
    if (this.id) {
      const { author, id, ...params } = await workshopById(this.id);
      this.params = params;
    }
    render(this.template(), this);
  }

  async onWorkshopCreate(e) {
    e.preventDefault();
    if (this.canSubmit) {
      this.params.speakerId = this.speaker;
      const response = await createWorkshop(this.params);
      this.canSubmit = false;
      setMessage(response.message);
      disableFieldset(this, '#create-disabled');
    }
  }

  async onWorkshopUpdate(e) {
    e.preventDefault();
    const response = await updateWorkshop(this.id, this.params);
    setMessage(response.message);
  }

  createButtonsTemplate() {
    return html`
      <p class="control">
        <a @click=${e => this.onWorkshopCreate(e)} class="button is-medium is-link">
          Create
        </a>
      </p>
      <p class="control">
        <a class="button is-medium is-light" href="/">
          Cancel
        </a>
      </p>
    `;
  }

  updateButtonsTemplate() {
    return html`
      <p class="control">
        <a @click=${e => this.onWorkshopUpdate(e)} class="button is-medium is-link">
          Update
        </a>
      </p>
      <p class="control">
        <a class="button is-medium is-light" href="/">
          Cancel
        </a>
      </p>
    `;
  }

  template() {
    const { title, description, date, time, technology } = this.params;
    return html`
      <fieldset id="create-disabled">
        <div class="columns is-spacing-10">
          <div class="column is-half">
            <div class="field">
              <label class="label is-medium">Title</label>
              <input
                @keyup=${e => this.onKeyup(e)}
                name="title"
                class="input is-medium"
                value=${title || ''}
              />
            </div>
          </div>
        </div>
        <div class="columns is-spacing-10">
          <div class="column">
            <div class="field">
              <label class="label is-medium">Description</label>
              <div class="control">
                <textarea
                  @keyup=${e => this.onKeyup(e)}
                  name="description"
                  style="min-height: 240px;"
                  class="textarea is-medium"
                >
  ${description || ''}</textarea
                >
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-spacing-10">
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label is-medium">Date</label>
              <input
                @keyup=${e => this.onKeyup(e)}
                name="date"
                class="input is-medium"
                type="text"
                value=${date || ''}
                placeholder="DD-MM-YYY"
              />
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label is-medium">Time</label>
              <input
                @keyup=${e => this.onKeyup(e)}
                name="time"
                class="input is-medium"
                type="text"
                value=${time || ''}
                placeholder="HH:MM"
              />
            </div>
          </div>
        </div>
        <div class="columns is-spacing-10">
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label is-medium">Technology</label>
              <input
                @keyup=${e => this.onKeyup(e)}
                name="technology"
                class="input is-medium"
                type="text"
                value=${technology || ''}
                placeholder="Javascript"
              />
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-right is-spacing-20">
          ${this.type === 'create' ? this.createButtonsTemplate() : ''}
          ${this.type === 'update' ? this.updateButtonsTemplate() : ''}
        </div>
      </fieldset>
    `;
  }
}

customElements.define('app-create-course', CreateCourse);
