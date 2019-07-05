import { customElement, html, LitElement, property } from 'lit-element';
import {
  addAttendeeToWorkshop,
  removeAttendeeFromWorkshop,
  workshopAttendees
} from 'services/module';

@customElement('app-attendees')
class Attendees extends LitElement {
  @property({ type: String }) private workshopId;
  @property({ type: String }) private attendeeId;
  @property({ type: Array }) private attendees;

  public async onAddRemoveAttendee(e, action = 'add') {
    e.preventDefault();
    let response = null;
    if (action === 'add') {
      response = await addAttendeeToWorkshop(this.workshopId, this.attendeeId);
    } else {
      response = await removeAttendeeFromWorkshop(
        this.workshopId,
        this.attendeeId
      );
    }
  }

  public async firstUpdated() {
    this.attendees = await workshopAttendees(this.workshopId);
    let canSubscribe = true;
    this.attendees = this.attendees.map(attendee => {
      if (this.attendeeId === attendee.id) {
        attendee.canUnsubscribe = true;
        canSubscribe = false;
      }
      return attendee;
    });
  }

  public addAttendeeeTemplate() {
    return html`
      <hr />
      <p class="buttons is-centered">
        <a
          @click=${e => this.onAddRemoveAttendee(e)}
          class="button is-link is-medium"
        >
          Subscribe
        </a>
      </p>
    `;
  }

  public removeAttendeeeTemplate() {
    this.canAddParticipate = false;
    return html`
      <span
        @click=${e => this.onAddRemoveAttendee(e, 'remove')}
        class="icon has-text-danger is-pulled-right"
      >
        <i class="fas fa-trash-alt fa-lg"></i>
      </span>
    `;
  }

  public template(attendees, canSubscribe) {
    const checkAttendeeId = this.attendeeId !== 'undefined';
    return html`
      <div class="box">
        ${this.attendees.map(attendee => {
          const { firstname, lastname, avatar, canUnsubscribe } = attendee;
          return html`
            <article class="media custom-attendees-media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img class="is-rounded" src=${avatar} alt="Image" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>${firstname} ${lastname}</strong>
                    ${canUnsubscribe ? this.removeAttendeeeTemplate() : ''}
                  </p>
                </div>
              </div>
            </article>
          `;
        })}
        ${checkAttendeeId && canSubscribe ? this.addAttendeeeTemplate() : null}
      </div>
    `;
  }

  public render() {
    if (!this.attendees) {
      return html`
        <h2>Loading...</h2>
      `;
    }
    return this.template(this.attendees, this.canSubscribe);
  }
}

export default Attendees;
