import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { setMessage } from 'utils/alert';
import { getAttendeesByWorkshop, addAttendeeByWorkshop } from 'utils/http-wrapper';
import './attendees.scss';

export default class Attendees extends HTMLElement {
  get workshopId() {
    return this.getAttribute('workshop-id');
  }

  get attendeeId() {
    return this.getAttribute('attendee-id');
  }

  async onAddAttendee(e) {
    e.preventDefault();
    const response = await addAttendeeByWorkshop(this.workshopId, this.attendeeId);
    setMessage(response.message);
    this.canAddParticipate = false;
    this.load();
  }

  async onRemoveAttendee(e) {
    e.preventDefault();
    console.log('Remove....');
  }

  connectedCallback() {
    this.load();
  }

  async load() {
    let attendees = await getAttendeesByWorkshop(this.workshopId);
    let canSubscribe = true;
    attendees = attendees.map(attendee => {
      if (this.attendeeId === attendee.id) {
        attendee.canUnsubscribe = true;
        canSubscribe = false;
      }
      return attendee;
    });
    render(this.template(attendees, canSubscribe), this);
  }

  addAttendeeeTemplate() {
    return html`
      <hr />
      <p class="buttons is-centered">
        <a @click=${e => this.onAddAttendee(e)} class="button is-primary is-medium">
          Subscribe
        </a>
      </p>
    `;
  }

  removeAttendeeeTemplate() {
    this.canAddParticipate = false;
    return html`
      <span
        @click=${e => this.onRemoveAttendee(e)}
        class="icon has-text-danger is-pulled-right"
      >
        <i class="fas fa-trash-alt fa-lg"></i>
      </span>
    `;
  }

  template(attendees, canSubscribe) {
    return html`
      <div class="box">
        ${repeat(attendees, attendee => {
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
        ${canSubscribe ? this.addAttendeeeTemplate() : null}
      </div>
    `;
  }
}

customElements.define('app-attendees', Attendees);
