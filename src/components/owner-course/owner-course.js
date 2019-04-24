import { html, render } from 'lit-html';

export default class OwnerCourse extends HTMLElement {
  get name() {
    return this.getAttribute('name');
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  get role() {
    return this.getAttribute('role');
  }

  get technology() {
    return this.getAttribute('technology');
  }

  get date() {
    return this.getAttribute('date');
  }

  get time() {
    return this.getAttribute('time');
  }

  async connectedCallback() {
    render(this.template(), this);
  }

  template() {
    return html`
      <div class="card" style="box-shadow: none;">
        <div class="card-content" style="padding: 0;">
          <hr />
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img class="is-rounded" src=${this.avatar} />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">${this.name}</p>
              <p class="subtitle is-6">${this.role}</p>
            </div>
          </div>
          <hr />
          <div class="content">
            <p>
              <strong>Technology: </strong>
              <a href="/hashtag/${this.technology}">#${this.technology}</a>
            </p>
            <p>
              <strong>Date: </strong>
              <time>${this.date}</time>
            </p>
            <p>
              <strong>Time: </strong>
              <time>${this.time}</time>
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-owner-course', OwnerCourse);
