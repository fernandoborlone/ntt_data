/// <reference types="Cypress"/>

import loc from './locators/locators'

Cypress.Commands.add('access_page_create_products', () => {
  cy.get(loc.PAGE_HOME.BTN_CREATE_PRODUCTS).click()
})

Cypress.Commands.add('access_products_list_page', () => {
  cy.get(loc.PAGE_HOME.BTN_PRODUCTS_LIST).click()
  cy.url().should('contain', '/listarprodutos')
})

Cypress.Commands.add('access_register_users_page', () => {
  cy.get(loc.PAGE_HOME.BTN_CREATE_USERS).click()
  cy.url().should('include', '/cadastrarusuarios')
})

Cypress.Commands.add('access_register_page', () => {
  cy.get(loc.PAGE_LOGIN.LINK_REGISTER).click()
  cy.url().should('include', '/cadastrarusuarios')
})

Cypress.Commands.add('awaiting_requisition', (aliases) => {
  cy.wait(aliases)
})

Cypress.Commands.add('create_account', (name, email, password) => {
  cy.access_register_page()
  cy.fill_form(name, email, password)
  cy.select_adm_account()
  cy.submit_form()
})

Cypress.Commands.add('create_users', (name, email, password) => {
  cy.fill_form(name, email, password)
  cy.select_adm_account()
  cy.submit_form_user()
})

Cypress.Commands.add('fill_form', (name, email, password) => {
  cy.get(loc.PAGE_REGISTER.INPUT_NAME).type(name)
  cy.get(loc.PAGE_REGISTER.INPUT_EMAIL).type(email)
  cy.get(loc.PAGE_REGISTER.INPUT_PASSWORD).type(password)
})

Cypress.Commands.add(
  'fill_form_register_products',
  (productName, price, description, quantity) => {
    cy.get(loc.PAGE_CREATE_PRODUCT.INPUT_NAME).type(productName, { delay: 0 })
    cy.get(loc.PAGE_CREATE_PRODUCT.INPUT_PRICE).type(price, { delay: 0 })
    cy.get(loc.PAGE_CREATE_PRODUCT.INPUT_DESCRIPTION).type(description, {
      delay: 0,
    })
    cy.get(loc.PAGE_CREATE_PRODUCT.INPUT_QUANTITY).type(quantity, { delay: 0 })
    cy.get(loc.PAGE_CREATE_PRODUCT.BTN_REGISTER).click()
  },
)

Cypress.Commands.add('fill_nameless_form', (email, password) => {
  cy.get(loc.PAGE_REGISTER.INPUT_EMAIL).type(email)
  cy.get(loc.PAGE_REGISTER.INPUT_PASSWORD).type(password)
})

Cypress.Commands.add('fill_emailless_form', (name, password) => {
  cy.get(loc.PAGE_REGISTER.INPUT_NAME).type(name)
  cy.get(loc.PAGE_REGISTER.INPUT_PASSWORD).type(password)
})

Cypress.Commands.add('fill_passwordless_form', (name, email) => {
  cy.get(loc.PAGE_REGISTER.INPUT_NAME).type(name)
  cy.get(loc.PAGE_REGISTER.INPUT_EMAIL).type(email)
})

Cypress.Commands.add(
  'invalid_login',
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.visit(Cypress.config('baseUrl'))
    cy.get(loc.PAGE_LOGIN.INPUT_EMAIL).type(email, { log: false })
    cy.get(loc.PAGE_LOGIN.INPUT_PASSWORD).type(password, { log: false })
    cy.get(loc.PAGE_LOGIN.BTN_SUBMIT).click()
  },
)

Cypress.Commands.add(
  'login',
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.session([email, password], () => {
      cy.visit(Cypress.config('baseUrl'))
      cy.get(loc.PAGE_LOGIN.INPUT_EMAIL).type(email, { log: false })
      cy.get(loc.PAGE_LOGIN.INPUT_PASSWORD).type(password, { log: false })
      cy.get(loc.PAGE_LOGIN.BTN_SUBMIT).click()
      cy.url().should('contain', '/admin/home')
    })
  },
)

Cypress.Commands.add('select_adm_account', () => {
  cy.get(loc.PAGE_REGISTER.CHK_ADM_ACCOUNT).check()
})

Cypress.Commands.add('submit_form', () => {
  cy.get(loc.PAGE_REGISTER.BTN_SUBMIT).click()
})

Cypress.Commands.add('submit_form_user', () => {
  cy.get(loc.PAGE_CREATE_USER.BTN_CREATE_USER).click()
})

Cypress.Commands.add('verify_created_product_in_the_list', (productName) => {
  cy.get('tbody tr').contains(productName).should('be.visible')
})

Cypress.Commands.add('verify_error_mensage', (errorMensage) => {
  cy.get(loc.PAGE_REGISTER.ALERT_ERROR).should('have.text', errorMensage)
})

Cypress.Commands.add(
  'verify_register_succesfuly',
  (txtCreateMensage, txtWelcome) => {
    cy.get(loc.PAGE_REGISTER.ALERT).should('have.text', txtCreateMensage)
    cy.get('h1').should('be.visible').and('have.text', txtWelcome)
  },
)

Cypress.Commands.add('verify_products_list', (qntProducts) => {
  cy.get(loc.PAGE_PRODUCTS_LIST.TBL_LIST).should('have.length', qntProducts)
})
