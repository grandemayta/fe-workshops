import { customElement, html, LitElement, property } from 'lit-element';
import { page } from '../../../helpers';
import { workshopById } from '../../../services/index';

@customElement('app-courses-detail')
class CoursesDetail extends LitElement {
  @property({ type: Object }) private params;
  @property({ type: Object }) private data;

  public async firstUpdated() {
    this.data = await workshopById(this.params.id);
  }

  public render() {
    console.log(this.params);
    if (!this.data) {
      return html`
        <h2>Loading...</h2>
      `;
    }
    const { title, description, technology, author, date, time } = this.data;
    const name = `${author.firstname} ${author.lastname}`;
    const { id: workshopId, userSession } = this.params;

    return html`
      <div class="container">
        <app-alert status message></app-alert>
        <div class="columns">
          <div class="column is-8">
            <h3 class="title is-3">${title}</h3>
            <p>${description}</p>
            <app-owner-course
              name=${name}
              avatar=${author.avatar}
              role=${author.role}
              technology=${technology}
              date=${date}
              time=${time}
            >
            </app-owner-course>
          </div>
          <div class="column is-4">
            <h4 class="title is-4">Attendees</h4>
            <app-attendees
              workshop-id=${workshopId}
              attendee-id=${userSession && userSession.id}
            ></app-attendees>
          </div>
        </div>
      </div>
    `;
  }
}

export default CoursesDetail;
