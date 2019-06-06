import { customElement, html, LitElement } from 'lit-element';

@customElement('app-home')
class Home extends LitElement {
  constructor() {
    super();
  }

  public render() {
    return html`
      <div class="container">
        <app-tiles-courses type="all"></app-tiles-courses>
      </div>
    `;
  }
}

export default Home;
