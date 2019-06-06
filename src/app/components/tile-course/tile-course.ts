import { customElement, html, LitElement, property } from 'lit-element';

@customElement('app-tile-course')
class TileCourse extends LitElement {
  @property({ type: String }) private id;
  @property({ type: String }) private title;
  @property({ type: String }) private authorName;
  @property({ type: String }) private authorAvatar;
  @property({ type: String }) private authorNickname;
  @property({ type: String }) private date;
  @property({ type: String }) private time;
  @property({ type: String }) private technology;
  @property({ type: String }) private action;

  constructor() {
    super();
    this.setAttribute('class', 'tile is-6 is-parent');
  }

  public updateButtonTemplate() {
    return html`
      <p class="control">
        <a class="button is-light" href="/courses/update/${this.id}">
          Update
        </a>
      </p>
    `;
  }

  public render() {
    return html`
      <div class="tile is-child box">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img class="is-rounded" src=${this.authorAvatar} />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${this.title}</p>
                <p class="subtitle is-6">
                  <span class="is-block is-size-5">
                    ${this.authorName}
                  </span>
                  <span class="is-block is-spacing-0">
                    <i class="fas fa-at has-text-grey-light"></i>
                    ${this.authorNickname}
                  </span>
                  <span class="is-block is-spacing-10">
                    <i class="fas fa-bell has-text-grey-light"></i>
                    <time datetime=${this.date}
                      >${this.date} - ${this.time}</time
                    >
                  </span>
                  <span
                    class="is-block is-spacing-10 ${this.action === 'read'
                      ? 'is-hidden'
                      : ''}"
                  >
                    <a href="/hashtag/${this.technology}"
                      >#${this.technology}</a
                    >
                  </span>
                </p>
              </div>
            </div>

            <div class="content">
              <div class="field is-grouped is-grouped-right">
                <p class="control ${this.action === 'edit' ? 'is-hidden' : ''}">
                  <a
                    href="/hashtag/${this.technology}"
                    class="button is-text has-text-link"
                  >
                    #${this.technology}
                  </a>
                </p>
                <p class="control">
                  <a class="button is-link" href="/courses/detail/${this.id}">
                    Show
                  </a>
                </p>
                ${this.action === 'edit' ? this.updateButtonTemplate() : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default TileCourse;
