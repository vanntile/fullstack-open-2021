import blog from '../fixtures/blog.json'
import blogs from '../fixtures/blogs.json'
import otherUser from '../fixtures/otherUser.json'
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name=current-username]').type(user.username)
      cy.get('input[name=current-password]').type(user.password)
      cy.get('button[type=submit]').click()

      cy.contains(`${user.name} logged in.`)
    })

    it('A blog can be created', function () {
      cy.contains('Create new blogpost').click()
      cy.get('input[name=title]').type(blog.title)
      cy.get('input[name=author]').type(blog.author)
      cy.get('input[name=url]').type(blog.url)
      cy.get('button[type=submit]').click()

      cy.contains(`${blog.title} by ${blog.author}`).should('have.css', 'border-color', 'rgb(0, 0, 0)')
    })

    it('A blog can be liked', function () {
      cy.contains('Create new blogpost').click()
      cy.get('input[name=title]').type(blog.title)
      cy.get('input[name=author]').type(blog.author)
      cy.get('input[name=url]').type(blog.url)
      cy.get('button[type=submit]').click()

      cy.contains('show details').click()
      cy.contains(`Likes: 0`)
      cy.get('button').contains('like').click()
      cy.contains(`Likes: 1`)
    })

    it('A blog can be deleted by its user', function () {
      cy.contains('Create new blogpost').click()
      cy.get('input[name=title]').type(blog.title)
      cy.get('input[name=author]').type(blog.author)
      cy.get('input[name=url]').type(blog.url)
      cy.get('button[type=submit]').click()

      cy.contains(new RegExp('^' + blog.title + ' by ' + blog.author))

      cy.contains('show details').click()
      cy.get('button').contains('delete').click()

      cy.contains(new RegExp('^' + blog.title + ' by ' + blog.author)).should('not.exist')
    })

    it('A blog cannot be deleted by other users', function () {
      cy.contains('Create new blogpost').click()
      cy.get('input[name=title]').type(blog.title)
      cy.get('input[name=author]').type(blog.author)
      cy.get('input[name=url]').type(blog.url)
      cy.get('button[type=submit]').click()

      cy.contains(new RegExp('^' + blog.title + ' by ' + blog.author))

      // Logout
      cy.get('button').contains('logout').click()

      // Create new user
      cy.request('POST', 'http://localhost:3003/api/users', otherUser)

      // Login with other user
      cy.get('input[name=current-username]').type(otherUser.username)
      cy.get('input[name=current-password]').type(otherUser.password)
      cy.get('button[type=submit]').click()

      cy.contains(`${otherUser.name} logged in.`)

      // Check blog existence
      cy.contains(new RegExp('^' + blog.title + ' by ' + blog.author))
      cy.contains('show details').click()
      cy.get('button').contains('delete').should('not.exist')
    })
  })

  describe('Manipulating post', function () {
    beforeEach(function () {
      cy.get('input[name=current-username]').type(user.username)
      cy.get('input[name=current-password]').type(user.password)
      cy.get('button[type=submit]').click()

      cy.contains(`${user.name} logged in.`)

      blogs.forEach((b) => {
        cy.contains('Create new blogpost').click()
        cy.get('input[name=title]').type(b.title)
        cy.get('input[name=author]').type(b.author)
        cy.get('input[name=url]').type(b.url)
        cy.get('button[type=submit]').click()

        cy.contains(new RegExp('^' + b.title + ' by ' + b.author))
      })
    })

    it('A blog can be created', function () {
      blogs.forEach((b) => {
        cy.contains(new RegExp('^' + b.title + ' by ' + b.author))
          .find('button')
          .click()

        for (let i = 0; i < b.likes; i++) {
          cy.contains('like').click()
          cy.wait(1000)
        }

        cy.contains('hide details').click()
      })

      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

      cy.contains(blogs[0].title)
        .parent()
        .children()
        .then(($elem) => {
          const titles = $elem.map((i, e) => e.textContent)

          sortedBlogs.forEach((t, i) => {
            expect(`${t.title} by ${t.author} show details`).equal(titles[i])
          })
        })
    })
  })
})
