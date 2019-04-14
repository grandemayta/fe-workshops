import { html, render } from 'lit-html';
import { getAttendeesByWorkshop } from 'utils/http-wrapper';
import './attendees.scss';

export default class Attendees extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  async connectedCallback() {
    const data = await getAttendeesByWorkshop(this.id);
    render(this.template(data), this);
  }

  template(attendees) {
    return html`
      <div class="box">
        ${attendees.map(attendee => {
          const { firstname, lastname, avatar } = attendee;
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
                  </p>
                </div>
              </div>
            </article>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('app-attendees', Attendees);
