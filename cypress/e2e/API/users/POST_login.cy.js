const faker = require('faker-br')

let name = null
let email = null
let password = null
let administrator = null

const sucessfulyMessage = 'Login realizado com sucesso'
const errorMessage = 'Email e/ou senha inválidos'

describe('Service: Login via API', () => {
  beforeEach(() => {
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

  it('POST - Should login', () => {
    cy.login_api(email, password).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.body).to.have.property('message', sucessfulyMessage)
    })
  })

  context('Context: Error Messages', () => {
    it('POST - Should display an alert when login whith invalid email', () => {
      cy.login_api('invalid@email.com.br', password).then((resp) => {
        expect(resp.status).to.eq(401)
        expect(resp.body).to.have.property('message', errorMessage)
      })
    })

    it('POST - Should display an alert when login whith invalid password', () => {
      cy.login_api(email, '999999').then((resp) => {
        expect(resp.status).to.eq(401)
        expect(resp.body).to.have.property('message', errorMessage)
      })
    })
  })
})
