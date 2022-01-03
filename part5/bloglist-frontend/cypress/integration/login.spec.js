import user from '../fixtures/user.json'

describe('Blog app', function () {
  beforeEach(function () {
    // Reset database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create here a user to backend
    cy.request('POST', 'http://localhost:3003/api/users', user)

    // Go to homepage
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login into this application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name=current-username]').type(user.username)
      cy.get('input[name=current-password]').type(user.password)
      cy.get('button[type=submit]').click()

      cy.contains(`${user.name} logged in.`)
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name=current-username]').type(user.username)
      cy.get('input[name=current-password]').type('wrong')
      cy.get('button[type=submit]').click()

      cy.contains('Wrong username or password').should('have.class', 'error')
      cy.get('.notification').should('have.css', 'background-color', 'rgb(238, 204, 204)')
    })
  })
})
