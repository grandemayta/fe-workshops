import { html, render } from 'lit-html';
import './tile-course.scss';

export default class TileCourse extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  get title() {
    return this.getAttribute('title');
  }

  get description() {
    return this.getAttribute('description');
  }

  get authorName() {
    return this.getAttribute('author-name');
  }

  get authorAvatar() {
    return this.getAttribute('author-avatar');
  }

  get date() {
    return this.getAttribute('date');
  }

  get technology() {
    return this.getAttribute('technology');
  }

  get secondAction() {
    return this.getAttribute('secondAction');
  }

  constructor() {
    super();
    this.setAttribute('class', 'tile is-6 is-parent');
  }

  connectedCallback() {
    render(this.template(), this);
  }

  updateButtonTemplate() {
    return html`
      <p class="control">
        <a class="button is-light" href="/courses/update/${this.id}">
          Update
        </a>
      </p>
    `;
  }

  template() {
    return html`
      <div class="tile is-child box">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img class="is-rounded" src=${this.authorAvatar} />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${this.title}</p>
                <p class="subtitle is-6">
                  ${this.authorName} - <time datetime=${this.date}>${this.date}</time>
                </p>
              </div>
            </div>

            <div class="content">
              ${this.description}
              <br />
              <a href="#">#${this.technology}</a>
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <a class="button is-primary" href="/courses/detail/${this.id}">
                    Show
                  </a>
                </p>
                ${this.secondAction === 'edit' ? this.updateButtonTemplate() : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-tile-course', TileCourse);
