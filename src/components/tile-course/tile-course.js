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

  get authorNickname() {
    return this.getAttribute('author-nickname');
  }

  get date() {
    return this.getAttribute('date');
  }

  get time() {
    return this.getAttribute('time');
  }

  get technology() {
    return this.getAttribute('technology');
  }

  get action() {
    return this.getAttribute('action');
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
                  <span class="is-block is-size-5">
                    ${this.authorName}
                  </span>
                  <span class="is-block is-spacing-0">
                    <i class="fas fa-at has-text-grey-light"></i>
                    ${this.authorNickname}
                  </span>
                  <span class="is-block is-spacing-10">
                    <i class="fas fa-bell has-text-grey-light"></i>
                    <time datetime=${this.date}>${this.date} - ${this.time}</time>
                  </span>
                  <span
                    class="is-block is-spacing-10 ${this.action === 'read'
                      ? 'is-hidden'
                      : ''}"
                  >
                    <a href="#">#${this.technology}</a>
                  </span>
                </p>
              </div>
            </div>

            <div class="content">
              <div class="field is-grouped is-grouped-right">
                <p class="control ${this.action === 'edit' ? 'is-hidden' : ''}">
                  <a class="button is-text has-text-link" href="#">
                    #${this.technology}
                  </a>
                </p>
                <p class="control">
                  <a class="button is-link" href="/courses/detail/${this.id}">
                    Show
                  </a>
                </p>
                ${this.action === 'edit' ? this.updateButtonTemplate() : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-tile-course', TileCourse);
