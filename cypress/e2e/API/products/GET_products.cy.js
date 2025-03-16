const faker = require('faker-br')

let name = null
let email = null
let password = null
let administrator = null
let token = null

let productName = null
let price = null
let description = null
let quantity = null
let id = null
describe('Service: List Products', () => {
  it('GET - Should list all products', () => {
    cy.list_products().then((resp) => {
      expect(resp).property('status').to.eq(200)
      expect(resp.body).to.have.property('quantidade').not.be.null
      expect(resp.body).to.have.property('produtos').not.be.null

      // verify property type
      expect(resp.body).to.have.property('quantidade').to.be.a('number')
      expect(resp.body).to.have.property('produtos').to.be.a('array')
    })
  })

  context('Context: Query Parameters', () => {
    before(() => {
      name = faker.name.firstName()
      email = faker.internet.email(name)
      password = faker.internet.password()
      administrator = ['true', 'false']

      // Created user by API
      cy.create_user_api(name, email, password, administrator[0]).then(
        (resp) => {
          return new Promise((resolve) => {
            expect(resp).property('status').to.equal(201)
            expect(resp).property('statusText').to.equal('Created')
            expect(resp.body).to.have.property('message')
            expect(resp.body).to.have.property('_id')
            expect(resp.body).property('message').to.be.a('string')
            expect(resp.body).to.contain({
              message: 'Cadastro realizado com sucesso',
            })
            resolve(email, password)
          })
        },
      )

      cy.login_api(email, password).then((resp) => {
        return new Promise((resolve) => {
          expect(resp).property('status').to.equal(200)
          token = resp.body.authorization
          resolve(token)
          console.log(token)
        })
      })
    })

    beforeEach(() => {
      productName = faker.commerce.productName()
      price = faker.commerce.price()
      description = faker.commerce.productMaterial()
      quantity = 2

      // Creates product
      Cypress._.times(1, () => {
        cy.create_produt_api(
          token,
          productName,
          price,
          description,
          quantity,
          id,
        ).then((resp) => {
          return new Promise((resolve) => {
            expect(resp.status).to.eq(201)
            expect(resp).have.property('statusText').to.eq('Created')
            expect(resp.body).have.property(
              'message',
              'Cadastro realizado com sucesso',
            )
            id = resp.body._id
            resolve(id)
          })
        })
      })
    })
    it('GET - Should list product by Id', () => {
      cy.list_product_by_id(id).then((resp) => {
        expect(resp).property('status').to.eq(200)
        expect(resp.body).to.have.property('quantidade', 1)
        expect(resp.body.produtos[0]).to.have.property('_id', id)
      })
    })

    it('GET - Should list product by name', () => {
      cy.list_product_by_name(productName).then((resp) => {
        expect(resp).property('status').to.eq(200)
        expect(resp.body).to.have.property('quantidade', 1)
        expect(resp.body.produtos[0]).to.have.property('nome', productName)
      })
    })

    it('GET - Should list product by description', () => {
      cy.list_product_by_description(description).then((resp) => {
        expect(resp).property('status').to.eq(200)
        expect(resp.body.produtos[0]).to.have.property('descricao', description)
      })
    })
  })
})
