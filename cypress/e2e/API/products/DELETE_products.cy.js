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
const id = null
let idProduto = null

describe('Service: Delete Products', () => {
  before(() => {
    name = faker.name.firstName()
    email = faker.internet.email(name)
    password = faker.internet.password()
    administrator = ['true', 'false']

    // Created user by API
    cy.create_user_api(name, email, password, administrator[0]).then((resp) => {
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
    })

    cy.login_api(email, password).then((resp) => {
      return new Promise((resolve) => {
        expect(resp).property('status').to.equal(200)
        token = resp.body.authorization
        resolve(token)
      })
    })
  })

  beforeEach(() => {
    productName = faker.commerce.productName()
    price = faker.commerce.price()
    description = faker.commerce.productMaterial()
    quantity = 2

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
          idProduto = resp.body._id
          resolve(idProduto, email, password)
        })
      })
    })
  })

  it('DELETE - Should delete product', () => {
    cy.delete_product_api(idProduto, token).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).have.property(
        'message',
        'Registro excluído com sucesso',
      )
    })
  })
})
