import { customElement, html, LitElement, property } from 'lit-element';
import { workshopById } from 'services/module';

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
              workshopId=${workshopId}
              attendeeId=${userSession && userSession.id}
            ></app-attendees>
          </div>
        </div>
      </div>
    `;
  }
}

export default CoursesDetail;
