const faker = require('faker-br')

let id = null
let name = null
let email = null
let password = null
let administrator = null

describe('Service: List Users', () => {
  it('GET - Should list all users', () => {
    cy.list_users().then((resp) => {
      expect(resp).to.have.property('status', 200)
      expect(resp.body).to.have.property('quantidade').not.be.null
      expect(resp.body).to.have.property('usuarios').not.be.null

      // verify property type
      expect(resp.body).to.have.property('quantidade').to.be.a('number')
      expect(resp.body).to.have.property('usuarios').to.be.a('array')
    })
  })

  context('Context: Query Parameters', () => {
    beforeEach(() => {
      name = `${faker.name.firstName()} ${faker.name.lastName()} `
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
          id = resp.body._id
          resolve(id, name, email, password)
        })
      })
    })

    it('GET - Should list user by Id', () => {
      cy.list_user_by_id(id).then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('quantidade', 1)
        expect(resp.body.usuarios[0]).to.have.property('_id', id)
      })
    })

    it('GET - Should list user by name', () => {
      cy.list_user_by_name(name).then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('quantidade', 1)
        expect(resp.body.usuarios[0]).to.have.property('nome', name)
      })
    })

    it('GET - Should list user by email', () => {
      cy.list_user_by_email(email).then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('quantidade', 1)
        expect(resp.body.usuarios[0]).to.have.property('email', email)
      })
    })
  })
})
