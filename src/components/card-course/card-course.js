import { html, render } from 'lit-html';

export default class CardCourse extends HTMLElement {
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

  connectedCallback() {
    render(this.template(), this);
  }

  template() {
    const courseUrl = `/courses/detail/${this.id}`;

    return html`
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
                <a class="button is-primary" href=${courseUrl}>
                  Show
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-card-course', CardCourse);
