Cypress.Commands.add(
  'create_user_api',
  (nome, email, password, administrador) => {
    cy.api({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      failOnStatusCode: false,
      body: {
        nome: nome,
        email: email,
        password: password,
        administrador: administrador,
      },
      resp: [],
    })
  },
)

Cypress.Commands.add(
  'create_produt_api',
  (token, nome, price, descption, quantity) => {
    cy.api({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        authorization: token,
      },
      body: {
        nome: nome,
        preco: price,
        descricao: descption,
        quantidade: quantity,
      },
      failOnStatusCode: false,
      resp: [],
    })
  },
)

Cypress.Commands.add('list_products', () => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/produtos`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_product_by_id', (id) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/produtos?_id=${id}`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_product_by_name', (productname) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/produtos?nome=${productname}`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_product_by_description', (description) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/produtos?descricao=${description}`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_users', () => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_user_by_id', (id) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios?_id=${id}`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_user_by_name', (name) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios?nome=${name}`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('list_user_by_email', (email) => {
  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/usuarios?email=${email}`,
    failOnStatusCode: false,
    headers: {
      'content-type': 'application/json',
    },
  })
})

Cypress.Commands.add('delete_user_api', (id) => {
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
    failOnStatusCode: false,
    resp: [],
  })
})

Cypress.Commands.add('delete_product_api', (idProduto, token) => {
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl')}/produtos/${idProduto}`,
    headers: {
      authorization: token,
    },
    failOnStatusCode: false,
    resp: [],
  })
})

Cypress.Commands.add(
  'login_api',
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.api({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      headers: {
        authorization: `${Cypress.env('token')}`,
      },
      body: {
        email: email,
        password: password,
      },
      failOnStatusCode: false,
      resp: [],
    })
  },
)

Cypress.Commands.add(
  'edit_user_api',
  (id, nome, email, password, administrador) => {
    cy.api({
      method: 'PUT',
      url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
      failOnStatusCode: false,

      body: {
        nome: nome,
        email: email,
        password: password,
        administrador: administrador,
      },
      resp: [],
    })
  },
)
