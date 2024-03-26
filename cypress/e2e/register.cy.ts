/* eslint-disable jest/expect-expect */
/**
 * Scenario register spec :
 *  - should display register page correctly
 *  - should display error message and disabled button register if name, email or password is empty
 *  - should display error message and disabled button register if name less than 3 character
 *  - should display error message and disabled button register if name greater than 50 character
 *  - should display error message and disabled button register if email pattern is not valid
 *  - should display error message and disabled button register if password less than 6 character
 *  - should display error message and disabled button register if password greater than 15 character
 *  - should display toast error if email already exists
 *  - should display toast success if register successfully
 *  - should redirect to login page if register successfully
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('should display register page correctly', () => {
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible')
  })

  it('should display error message and disabled button register if name, email or password is empty', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click()

    cy.get('p').contains('Name is required').should('be.visible')
    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p').contains('Password is required').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message and disabled button register if name less than 3 character', () => {
    cy.get('input[type="text"]').type('ze')
    cy.get('form').submit()

    cy.get('p')
      .contains('Min. name length is 3 characters')
      .should('be.visible')
    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p').contains('Password is required').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message and disabled button register if name greater than 50 character', () => {
    cy.get('input[type="text"]').type(
      'vestiazetaxkobokanaeruxkaelakovalskiaxayundarisuxmoonahoshinovaxairaniiofifteenxkureijiolliexanyamelfisaxpavoliareine',
    )
    cy.get('form').submit()

    cy.get('p')
      .contains('Max. name length is 50 characters')
      .should('be.visible')
    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p').contains('Password is required').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message and disabled button register if email pattern is not valid', () => {
    cy.get('input[type="email"]').type('zeta@gmail.holoid')
    cy.get('form').submit()

    cy.get('p').contains('Password is required').should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message and disabled button register if password less than 6 character', () => {
    cy.get('input[type="password"]').type('zeta')
    cy.get('form').submit()

    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p')
      .contains('Min. password length is 6 characters')
      .should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display error message and disabled button register if password greater than 15 character', () => {
    cy.get('input[type="password"]').type('zeta123456789zeta')
    cy.get('form').submit()

    cy.get('p').contains('Email is required').should('be.visible')
    cy.get('p')
      .contains('Max. password length is 15 characters')
      .should('be.visible')
    cy.get('button').should('be.disabled')
  })

  it('should display toast error if email already exists', () => {
    cy.get('input[type="text"]').type('Vestia Zeta')
    cy.get('input[type="email"]').type('zeta@gmail.com')
    cy.get('input[type="password"]').type('zeta123')

    cy.get('form').submit()

    cy.get('[data-cy="toast-viewport"]').should('be.visible')
  })

  it('should display toast success if register successfully', () => {
    cy.get('input[type="text"]').type('Zeta Vestia')
    cy.get('input[type="email"]').type(`zeta-${+new Date()}@gmail.com`)
    cy.get('input[type="password"]').type('zeta123')
    cy.get('form').submit()

    cy.get('[data-cy="toast-viewport"]').should('be.visible')
  })

  it('should redirect to login page if register successfully', () => {
    cy.get('input[type="text"]').type('Zeta Vestia')
    cy.get('input[type="email"]').type(`zeta-${+new Date()}@gmail.com`)
    cy.get('input[type="password"]').type('zeta123')
    cy.get('form').submit()

    cy.get('[data-cy="toast-viewport"]').should('be.visible')
    cy.visit('http://localhost:3000/login')
    cy.location('pathname').should('eq', '/login')
  })
})
