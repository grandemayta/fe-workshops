import { html, render } from 'lit-html';
import { getCourses } from 'utils/http-wrapper';
import './home.scss';

export default class Home {
  constructor(el) {
    this.el = el;
  }

  cardCourseTpl(data) {
    const { id, title, shortDescription, author, date, technology } = data;
    return html`
      <app-card-course
        id=${id}
        title=${title}
        description=${shortDescription}
        author-name=${author.name}
        author-avatar=${author.avatar}
        date=${date}
        technology=${technology}
      ></app-card-course>
    `;
  }

  template(courses) {
    return html`
      <app-header></app-header>
      <section>
        <div class="container">
          <div class="columns is-multiline is-vcentered">
            ${courses.map(course => {
              return html`
                <div class="column is-6">${this.cardCourseTpl(course)}</div>
              `;
            })}
          </div>
        </div>
      </section>
    `;
  }

  async load() {
    const courses = await getCourses();
    render(this.template(courses), this.el);
  }
}
