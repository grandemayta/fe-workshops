import { html, render } from 'lit-html';
import { getCourseById } from 'utils/http-wrapper';

export default class Detail {
  constructor(el, params) {
    this.el = el;
    this.params = params;
  }

  template(data) {
    const { title, description, author, date, time } = data;
    return html`
      <app-header></app-header>
      <app-sub-header title="Workshop detail"></app-sub-header>
      <section>
        <div class="container">
          <div class="columns">
            <div class="column is-8">
              <h3 class="title is-3">${title}</h3>
              <p>${description}</p>
              <hr />
              <h4 class="title is-4">Detail</h4>
              <div class="content">
                <span class="icon">
                  <i class="fas fa-calendar-alt"></i>
                </span>
                <span>${date} ${time}</span>
              </div>
              <article class="media custom-attendees-media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img class="is-rounded" src=${author.avatar} alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>${author.name}</strong>
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div class="column is-4">
              <h4 class="title is-4">Attendees</h4>
              <app-attendees id=${this.params.id}></app-attendees>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async load() {
    const data = await getCourseById(this.params.id);
    render(this.template(data), this.el);
  }
}
