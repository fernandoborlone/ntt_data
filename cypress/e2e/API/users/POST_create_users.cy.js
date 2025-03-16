const faker = require('faker-br')

let name = null
let email = null
let password = null
let administrador = null

describe('Service: Create Users', () => {
  beforeEach(() => {
    name = faker.name.firstName()
    email = faker.internet.email(name)
    password = faker.internet.password()
    administrador = 'true'
  })

  Cypress._.times(1, () => {
    it('POST - Should create user', () => {
      cy.create_user_api(name, email, password, administrador).then((resp) => {
        expect(resp.status).to.eq(201)
        expect(resp).to.have.property('statusText', 'Created')
        expect(resp.body).to.have.property(
          'message',
          'Cadastro realizado com sucesso',
        )
        expect(resp.body).to.have.property('_id')
      })
    })
  })

  context('Context: Error Messages', () => {
    it('POST - Should display an alert when property name is null', () => {
      cy.create_user_api(null, email, password, administrador).then((resp) => {
        expect(resp.status).to.eq(400)
        expect(resp.body).to.have.property('nome', 'nome deve ser uma string')
      })
    })

    it('POST - Should display an alert when property name is empty', () => {
      cy.create_user_api('', email, password, administrador).then((resp) => {
        expect(resp.status).to.eq(400)
        expect(resp.body).to.have.property(
          'nome',
          'nome não pode ficar em branco',
        )
      })
    })

    it('POST - Should display an alert when property email is null', () => {
      cy.create_user_api(name, null, password, administrador).then((resp) => {
        expect(resp.status).to.eq(400)
        expect(resp.body).to.have.property('email', 'email deve ser uma string')
      })
    })

    it('POST - Should display an alert when property email is empty', () => {
      cy.create_user_api(name, '', password, administrador).then((resp) => {
        expect(resp.status).to.eq(400)
        expect(resp.body).to.have.property(
          'email',
          'email não pode ficar em branco',
        )
      })
    })

    it('POST - Should display an alert when property password is null', () => {
      cy.create_user_api(name, email, null, administrador).then((resp) => {
        expect(resp.status).to.eq(400)
        expect(resp.body).to.have.property(
          'password',
          'password deve ser uma string',
        )
      })
    })

    it('POST - Should display an alert when property password is empty', () => {
      cy.create_user_api(name, email, '', administrador).then((resp) => {
        expect(resp).property('status').to.equal(400)
        expect(resp.body).to.have.property(
          'password',
          'password não pode ficar em branco',
        )
      })
    })
  })
})
