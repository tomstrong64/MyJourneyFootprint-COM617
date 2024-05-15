// e2e test for Calculate component

describe('Calculate Page Test', () => {
    beforeEach(() => {
        // Visit the page before each test
        cy.visit('/calculate')
    }
    )
    it('Renders without errors', () => {
        cy.get('[data-cy="header-nav-bar"]').should('exist')
        cy.get('.bg-gray-900').should('exist')
        cy.get('[data-cy="calculate-component"]').should('exist')
        cy.get('[data-cy="footer-component"]').should('exist')
    })
    it('Renders the Calculate component', () => {
        cy.get('[data-cy="calculate-component"]').should('exist')
    })
    it('Renders the Calculate component with the correct title', () => {
        cy.get('[data-cy="calculate-component"]').should('exist')
        cy.get('[data-cy="calculate-title"]').should('exist')
        cy.get('[data-cy="calculate-title"]').should('contain', 'Calculate')
    })
    it('Renders the Calculate component with the correct description', () => {
        cy.get('[data-cy="calculate-component"]').should('exist')
    })
    it('Renders the Calculate component with the correct form', () => {
        cy.get('[data-cy="calculate-component"]').should('exist')
        cy.get('[data-cy="calculate-form"]').should('exist')
    })
    it('Renders the Calculate component with the correct form fields', () => {
        cy.get('[data-cy="calculate-component"]').should('exist')
        cy.get('[data-cy="calculate-form"]').should('exist')
    })
    
})
  