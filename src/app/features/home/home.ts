import { customElement, html, LitElement, property } from 'lit-element';

@customElement('app-home')
class Home extends LitElement {
  @property({ type: Object }) private params;

  public render() {
    return html`
      <div class="container">
        <app-tiles-courses type="all"></app-tiles-courses>
      </div>
    `;
  }
}

export default Home;
