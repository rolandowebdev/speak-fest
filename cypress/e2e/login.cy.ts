/* eslint-disable jest/expect-expect */
/**
 * - Scenario login spec :
 *   - should display login page correctly
 *   - should display error message & disabled button login if email or password is empty
 *   - should display error message & disabled button login if email pattern is not valid
 *   - should display error message & disabled button login if password less than 6 character
 *   - should display error message & disabled button login if password greater than 15 character
 *   - should display toastify error if email or password is incorrect
 *   - should display toastify success if email or password is correct
 *   - should redirect to threads page if login successfully
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('should display login page correctly', () => {
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible')
  })

  it('should display error message & disabled button login if email or password is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click()

    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p').contains('Password is required').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message & disabled button login if email pattern is not valid', () => {
    cy.get('input[type="email"]').type('zeta@gmail.com')
    cy.get('form').submit()

    cy.get('p').contains('Password is required').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message & disabled button login if password less than 6 character', () => {
    cy.get('input[type="password"]').type('zeta')
    cy.get('form').submit()

    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p')
      .contains('Min. password length is 6 characters')
      .should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message & disabled button login if password greater than 15 character', () => {
    cy.get('input[type="password"]').type('zeta123456789zeta')
    cy.get('form').submit()

    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p')
      .contains('Max. password length is 15 characters')
      .should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display toastify error if email or password is incorrect', () => {
    cy.get('input[type="email"]').type('zeta@gmail.com')
    cy.get('input[type="password"]').type('fakezeta123')
    cy.get('form').submit()

    cy.get('[data-cy="toast-viewport"]').should('be.visible')
  })

  it('should display toastify success if email or password is correct', () => {
    cy.get('input[type="email"]').type('zeta@gmail.com')
    cy.get('input[type="password"]').type('zeta123')
    cy.get('form').submit()

    cy.get('[data-cy="toast-viewport"]').should('be.visible')
  })

  it('should redirect to threads page if login successfully', () => {
    cy.get('input[type="email"]').type('zeta@gmail.com')
    cy.get('input[type="password"]').type('zeta123')
    cy.get('form').submit()

    cy.url().should('eq', 'http://localhost:3000/')
  })
})
