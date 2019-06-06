import { customElement, html, LitElement, property } from 'lit-element';
import {
  workshops,
  workshopsByHashtag,
  workshopsBySpeaker
} from '../../services/index';

@customElement('app-tiles-courses')
class TilesCourses extends LitElement {
  @property({ type: String }) private type;
  @property({ type: String }) private speaker;
  @property({ type: String }) private value;
  @property({ type: Array }) private courses;
  private action: string;

  public coursesTemplate(courses, action) {
    return html`
      <div class="tile is-ancestor">
        ${courses.map(course => {
          const { id, title, author, date, time, technology } = course;
          return html`
            <app-tile-course
              id=${id}
              title=${title}
              authorName=${author.firstname + ' ' + author.lastname}
              authorAvatar=${author.avatar}
              authorNickname=${author.nickname}
              date=${date}
              time=${time}
              technology=${technology}
              action=${action}
            ></app-tile-course>
          `;
        })}
      </div>
    `;
  }

  public orderByTwoCols(courses) {
    let counter = 0;
    const tileMain = [];
    let tileChildren = [];

    courses.forEach((course, index) => {
      const lastValue = courses.length === index + 1;
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

  public async firstUpdated() {
    switch (this.type) {
      case 'hashtag':
        this.action = 'hashtag';
        this.courses = this.orderByTwoCols(
          await workshopsByHashtag(this.value)
        );
        break;
      case 'speaker':
        this.action = 'edit';
        this.courses = this.orderByTwoCols(
          await workshopsBySpeaker(this.speaker)
        );
        break;
      case 'all':
      default:
        this.action = 'read';
        this.courses = this.orderByTwoCols(await workshops());
    }
  }

  public render() {
    if (!this.courses) {
      return html`
        <h2>Loading...</h2>
      `;
    }
    return html`
      ${this.courses.map(course => {
        return html`
          ${this.coursesTemplate(course, this.action)}
        `;
      })}
    `;
  }
}

export default TilesCourses;
