const faker = require('faker-br')

let name = null
let email = null
let password = null
let administrator = null

const errorMensage = '×Email e/ou senha inválidos'

describe('Login', () => {
  context('Context: Valid Credentials', () => {
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
      cy.login(email, password)
      cy.visit('/admin/home')
    })

    it('Should login succesfuly', () => {
      const txtWelcome = `Bem Vindo  ${name}`

      cy.get('h1').should('be.visible').and('have.text', txtWelcome)
    })
  })

  context('Context: Invalid Credentials', () => {
    it('Should display the Alert: Email e/ou senha inválidos', () => {
      cy.invalid_login('invalid@email.com.br', 'invalid_password')
      cy.verify_error_mensage(errorMensage)
    })
  })
})
