describe('API - Usuários', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/usuarios`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.usuarios).to.be.an('array')
    })
  })

  it('deve cadastrar um novo usuário com sucesso', () => {
    const usuario = {
      nome: 'Usuário Teste',
      email: `teste${Date.now()}@email.com`,
      password: 'teste123',
      administrador: 'true',
    }

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      body: usuario,
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
    })
  })

  it('deve validar tentativa de cadastro com email já utilizado', () => {
    const usuario = {
      nome: 'Usuário Duplicado',
      email: 'fulano@qa.com', // email já existente
      password: 'teste123',
      administrador: 'true',
    }

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      body: usuario,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.message).to.eq('Este email já está sendo usado')
    })
  })
})
