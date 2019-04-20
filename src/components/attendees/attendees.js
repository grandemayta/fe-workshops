import { html, render } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { setMessage } from 'utils/alert';
import {
  getAttendeesByWorkshop,
  addAttendeeByWorkshop,
  removeAttendeeByWorkshop
} from 'utils/http-wrapper';
import './attendees.scss';

export default class Attendees extends HTMLElement {
  get workshopId() {
    return this.getAttribute('workshop-id');
  }

  get attendeeId() {
    return this.getAttribute('attendee-id');
  }

  async onAddRemoveAttendee(e, action = 'add') {
    e.preventDefault();
    let response = null;
    if (action === 'add') {
      response = await addAttendeeByWorkshop(this.workshopId, this.attendeeId);
    } else {
      response = await removeAttendeeByWorkshop(this.workshopId, this.attendeeId);
    }
    setMessage(response.message);
    this.load();
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
        <a @click=${e => this.onAddRemoveAttendee(e)} class="button is-link is-medium">
          Subscribe
        </a>
      </p>
    `;
  }

  removeAttendeeeTemplate() {
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

  template(attendees, canSubscribe) {
    const checkAttendeeId = this.attendeeId !== 'undefined';
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
        ${checkAttendeeId && canSubscribe ? this.addAttendeeeTemplate() : null}
      </div>
    `;
  }
}

customElements.define('app-attendees', Attendees);
