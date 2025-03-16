const faker = require('faker-br')

let id
let name = null
let email = null
let password = null
let administrator = null

describe('Service: Editions Users', () => {
  beforeEach(() => {
    name = faker.name.firstName()
    email = faker.internet.email(name)
    password = faker.internet.password()
    administrator = 'true'

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
        resolve(id)
      })
    })
  })

  it('PUT - Should edit the name of user', () => {
    cy.edit_user_api(id, 'Altered name', email, password, administrator).then(
      (resp) => {
        expect(resp).property('status').to.equal(200)
        expect(resp.body).property('message', 'Registro alterado com sucesso')
      },
    )
  })
})
