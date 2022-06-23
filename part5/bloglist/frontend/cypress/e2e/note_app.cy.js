describe('Blog app', function() {

  beforeEach(function() {

    // user 1
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

      it('blog can be deleted', function () {
        // view the blog
        cy.contains('View details').click()
        // delete blog
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'a cypress blog by cypress author')

      })


      it('multiple blogs are listed by their like count in descending order', function() {
        // add 2 more blogs
        cy.createBlog({ title: 'Title 2', author: 'Author 2', url: 'www.udbsfuisbdf.com', likes: 10 })
        cy.createBlog({ title: 'Title 3', author: 'Author 3', url: 'www.addfuueif.com', likes: 5 })

        // handy references for each of the blogs
        cy.get('.blog').children().eq(0).as('first')
        cy.get('.blog').children().eq(1).as('second')
        cy.get('.blog').children().eq(2).as('third')

        // show the likes for each of the blogs
        cy.get('@first').contains('View details').click()
        cy.get('@second').contains('View details').click()
        cy.get('@third').contains('View details').click()

        // the order on the page is sorted by likes descending
        cy.get('@first').contains('10 likes')
        cy.get('@second').contains('5 likes')
        cy.get('@third').contains('0 likes')
      })

    })

  })

})