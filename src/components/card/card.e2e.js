describe('My component', () => {
  context('Desktop Resolution', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3002/');
      cy.viewport(1280, 720);
    });

    it('Should have a width of 400px', () => {
      cy.get('.card').should('have.css', 'width', '400px');
    });

    it('Should have a background color equal to rgb(248, 248, 248)', () => {
      cy.get('.card').should('have.css', 'background-color', 'rgb(248, 248, 248)');
    });

    it('Should have a title with font size equal to 18px', () => {
      cy.get('.card > h1').should('have.css', 'font-size', '18px');
    });

    it('Should have an image', () => {
      cy.get('.card > img').should('have.attr', 'src', 'js.svg');
    });

    it('Should have an image with length equal to 300px', () => {
      cy.get('.card > img').should('have.css', 'width', '300px');
    });

    it('Should have an button with background rgb(33, 150, 243)', () => {
      cy.get('.card > button').should(
        'have.css',
        'background-color',
        'rgb(33, 150, 243)'
      );
    });

    it('Should have an button with with equal to 140px', () => {
      cy.get('.card > button').should('have.css', 'width', '140px');
    });
  });

  context('Mobile Resolution', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3002/');
      cy.viewport('iphone-6');
    });

    it('Should have a margin left and right equal to 20px', () => {
      cy.get('.card').should('have.css', 'margin-left', '20px');
      cy.get('.card').should('have.css', 'margin-right', '20px');
    });
  });
});
