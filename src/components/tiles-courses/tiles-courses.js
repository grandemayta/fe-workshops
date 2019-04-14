import { html, render } from 'lit-html';
import { getWorkshops } from 'utils/http-wrapper';

export default class TilesCourses extends HTMLElement {
  async connectedCallback() {
    const courses = this.orderByTwoCols(await getWorkshops());
    render(this.template(courses), this);
  }

  coursesTemplate(courses) {
    return html`
      <div class="tile is-ancestor">
        ${courses.map(course => {
          const { id, title, author, date, technology } = course;
          return html`
            <app-tile-course
              id=${id}
              title=${title}
              author-name=${author.firstname + ' ' + author.lastname}
              author-avatar=${author.avatar}
              date=${date}
              technology=${technology}
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

    courses.forEach(course => {
      counter++;
      tileChildren.push(course);
      if (counter === 2) {
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
