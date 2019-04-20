import { html, render } from 'lit-html';
import { getWorkshops, getWorkshopsBySpeaker } from 'utils/http-wrapper';

export default class TilesCourses extends HTMLElement {
  constructor() {
    super();
    this.secondAction = '';
  }

  get type() {
    return this.getAttribute('type');
  }

  get speaker() {
    return this.getAttribute('speaker');
  }

  async connectedCallback() {
    let courses = [];
    switch (this.type) {
      case 'speaker':
        this.action = 'edit';
        courses = this.orderByTwoCols(await getWorkshopsBySpeaker(this.speaker));
        break;
      case 'all':
      default:
        courses = this.orderByTwoCols(await getWorkshops());
    }
    render(this.template(courses), this);
  }

  coursesTemplate(courses) {
    return html`
      <div class="tile is-ancestor">
        ${courses.map(course => {
          const { id, title, author, date, time, technology } = course;
          return html`
            <app-tile-course
              id=${id}
              title=${title}
              author-name=${author.firstname + ' ' + author.lastname}
              author-avatar=${author.avatar}
              date=${date}
              time=${time}
              technology=${technology}
              action=${this.action}
            ></app-tile-course>
          `;
        })}
      </div>
    `;
  }

  orderByTwoCols(courses) {
    let counter = 0;
    let tileMain = [];
    let tileChildren = [];

    courses.forEach((course, index) => {
      let lastValue = courses.length === index + 1;
      counter++;
      tileChildren.push(course);
      if (counter === 2 || lastValue) {
        tileMain.push(tileChildren);
        tileChildren = [];
        counter = 0;
      }
    });
    return tileMain;
  }

  template(courses) {
    return html`
      ${courses.map(course => {
        return html`
          ${this.coursesTemplate(course)}
        `;
      })}
    `;
  }
}

customElements.define('app-tiles-courses', TilesCourses);
