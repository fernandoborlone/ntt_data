const faker = require('faker-br')

let name = null
let email = null
let password = null
let administrator = null

let productName = null
let price = null
let description = null
let quantity = null

describe('Products', () => {
  context('Context: Create Products', () => {
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
      productName = faker.commerce.productName()
      price = faker.commerce.price()
      description = faker.commerce.productMaterial()
      quantity = '2'

      cy.intercept('GET', '**/produtos').as('getProducts')
      cy.intercept('GET', '**/listarprodutos').as('getListProducts')

      cy.login(email, password)
      cy.visit('/admin/home')
    })

    it('Should create a new product', () => {
      cy.access_page_create_products()
      cy.fill_form_register_products(productName, price, description, quantity)
      cy.awaiting_requisition('@getProducts')
      cy.verify_created_product_in_the_list(productName)
    })
  })
})
