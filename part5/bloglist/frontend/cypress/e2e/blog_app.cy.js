describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', function() {
    cy.contains('Blog App')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  describe ('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()

      // fill form
      cy.get('#title').type('a cypress blog')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')

      cy.get('#addBlog').click()

      cy.contains('a cypress blog by cypress author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another note cypress',
          author: 'Another Author',
          url: 'www.anothercypressblog.comn'
        })
      })

      it('a blog can be liked', function () {
        // view & like the blog
        cy.contains('View details').click()
        cy.contains('Like').click()
        // blog was liked
        cy.contains('1 likes')
      })
    })

  })

})