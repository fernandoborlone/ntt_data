const faker = require('faker-br')

let name = null
let email = null
let password = null
let administrator = null

describe('Products', () => {
  context('Context: List Products', () => {
    before(() => {
      name = faker.name.firstName()
      email = faker.internet.email(name)
      password = faker.internet.password()
      administrator = 'true'

      // Created user by API
      cy.create_user_api(name, email, password, administrator).then((resp) => {
        return new Promise((resolve) => {
          expect(resp.status).to.eq(201)
          expect(resp).to.have.property('statusText', 'Created')
          expect(resp.body).to.have.property(
            'message',
            'Cadastro realizado com sucesso',
          )
          expect(resp.body).to.have.property('_id')
          resolve(email, password)
        })
      })
    })

    beforeEach(() => {
      cy.intercept('GET', '**/produtos').as('getProducts')
      cy.login(email, password)
      cy.visit('/admin/home')
    })

    it('Should view all products', () => {
      cy.access_products_list_page()
      cy.awaiting_requisition('@getProducts')

      cy.get('h1').should('be.visible').and('have.text', 'Lista dos Produtos')
    })
  })
})
