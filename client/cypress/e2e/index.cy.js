describe('Index Page Tests', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/')
  })

  it('Renders without errors', () => {
    cy.get('[data-cy="header-nav-bar"]').should('exist')
    cy.get('.bg-gray-900').should('exist')
    cy.get('[data-cy="get-started-link"]').should('exist')
    cy.get('[data-cy="sign-up-link"]').should('exist')
    cy.get('[data-cy="footer-component"]').should('exist')
  })

  it('Navigates to the Calculate page when "Get started" is clicked', () => {
    cy.get('[data-cy="get-started-link"]').click()
    cy.url().should('include', '/calculate')
  })

  it('Navigates to the Register page when "Sign Up" is clicked', () => {
    cy.get('[data-cy="sign-up-link"]').click()
    cy.url().should('include', '/register')
  })
})
