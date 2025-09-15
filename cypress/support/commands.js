// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('practiceUrl', () => {

    cy.visit('/')

    cy.title().should('eq', 'My Shop')

})

Cypress.Commands.add('emailVálido', (email) => {

    cy.get('input[type="text"][name="email_create"]').type(email).blur()
        .should('have.css', 'border-color', 'rgb(70, 167, 78)')

    cy.get('#SubmitCreate').click()

    cy.get('#create_account_error').should('not.exist')

})

Cypress.Commands.add('validateBorder', { prevSubject: true }, (subject, color) => {

  cy.wrap(subject).should('have.css', 'border-color', color);

})

Cypress.Commands.add('dadosDeCadastro', (nome, senha) => {

    cy.get('input[type="radio"][value="1"]').check()

      cy.get('#customer_firstname')
        .type(nome)
        .blur()
        .validateBorder('rgb(70, 167, 78)')

      cy.get('#customer_lastname')
        .type('Last')
        .blur()
        .validateBorder('rgb(70, 167, 78)')

      cy.get('#email')
        .click()
        .blur()
        .validateBorder('rgb(70, 167, 78)')

      cy.get('#passwd')
        .type(senha)
        .blur()
        .validateBorder('rgb(70, 167, 78)')

      cy.get('#days').select('9')
      cy.get('#months').select('6')
      cy.get('#years').select('1994')

      cy.contains('.btn[type="submit"][name="submitAccount"]', 'Register').click()
})

Cypress.Commands.add('realizarLogin', (email, senha, name) => {

    cy.get('input[name="email"][id="email"]').type(email)
    cy.get('input[name="passwd"]').type(senha)
    cy.get('button[type="submit"][name="SubmitLogin"]').click()
    cy.wait(2000)
    cy.get('a.account').contains(name);

})
Cypress.Commands.add('areaLogada', (email, senha, name) => {

    cy.practiceUrl()

    cy.contains('a', 'Sign in').click()

    cy.realizarLogin(email, senha, name)
})
Cypress.Commands.add('validarCampoOk', (elemento, dados) => {

    cy.get(elemento)
    .type(dados)
    .blur()
    .validateBorder('rgb(70, 167, 78)')
})

Cypress.Commands.add('pesquisarProduto', (produto) => {

    cy.get('#search_query_top').type(produto)

    cy.get('button[type="submit"][name="submit_search"]').click()

    cy.contains(produto).should('be.visible')

})

Cypress.Commands.add('selProdutoPesquisado', (produto) => {

    cy.get(`.product-name[title="${produto}"][itemprop="url"]`).eq(0).scrollIntoView()

    cy.get(`.product-name[title="${produto}"][itemprop="url"]`).eq(0).click()
})

Cypress.Commands.add('selecionaTitulo', (titulo) => {

    cy.get(`a[title="${titulo}"]`).click()
    
})
Cypress.Commands.add('botaoCarrinho', () => {

    cy.get('button[type="submit"][name="Submit"]').click()

})


