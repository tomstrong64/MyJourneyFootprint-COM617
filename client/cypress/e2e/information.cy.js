describe('Information Page', () => {
    beforeEach(() => {
      // Visit the Information page before each test
      cy.visit('/info');
    });
  
    it('Renders without errors', () => {
      // Check if the page renders without errors
      cy.get('[data-cy="header-nav-bar"]').should('exist');
      cy.get('.bg-gray-900').should('exist');
      cy.get('[data-cy="information-component"]').should('exist');
      cy.get('[data-cy="footer-component"]').should('exist');
    });
  
    it('Displays the correct title', () => {
      // Check if the page displays the correct title
      cy.get('[data-cy="information-title"]').should('exist');
      cy.get('[data-cy="information-title"]').should(
        'contain',
        'Understanding Carbon Impact & Sustainable Practices'
      );
    });
  
    it('Displays the correct content paragraphs', () => {
      // Check if the page displays the correct content paragraphs
        cy.get('[data-cy="information-paragraph"]').should('exist');
      
    });
  });
  