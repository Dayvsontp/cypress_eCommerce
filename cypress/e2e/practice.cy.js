/// <reference types="cypress" />


describe('teste de prática', () => {

  const randomString = Math.random().toString(36).substring(2, 7); // Gera uma string de 5 caracteres aleatórios
  const email = randomString + '@yopmail.com';
  const nome = 'Teste Name';

  context('cadastro de login', () => {

    it('deve validar email com sucesso', () => {

      cy.practiceUrl()

      cy.contains('a', 'Sign in').click()

      cy.emailVálido(email)

    })

    it('deve realizar cadastro de login com sucesso', () => {

      cy.practiceUrl()

      cy.contains('a', 'Sign in').click()

      cy.emailVálido(email)

      cy.dadosDeCadastro(nome, randomString)

      cy.get('.alert')
        .validateBorder('rgb(72, 177, 81)')
        .contains('Your account has been created.')

    })

  })

  context('login', () => {

    it('deve realizar login com sucesso', () => {

      cy.practiceUrl()

      cy.contains('a', 'Sign in').click()

      cy.realizarLogin(email, randomString, nome)


    })     

  })

  context('cadastro de endereço', () => {

    it('deve realizar cadastro de endereço com sucesso', () => {

      cy.areaLogada(email, randomString, nome)

      cy.get('a[title="Add my first address"]').click()

      cy.get('#firstname')
        .click()
        .blur()
        .validateBorder('rgb(70, 167, 78)')

      cy.get('#lastname')
        .click()
        .blur()
        .validateBorder('rgb(70, 167, 78)')

      cy.validarCampoOk('#address1', 'Rua Um')

      cy.validarCampoOk('#city', 'Paulista')
      
      cy.get('#id_state')
        .select(1)

      cy.get('#postcode')
        .type('35004')
        .blur()
        .validateBorder('rgb(203, 202, 202)')

      cy.get('#id_country option[value="21"]').should('exist')

      cy.validarCampoOk('#phone', '81997203737')
      
      cy.validarCampoOk('#phone_mobile', '81997203737')

      cy.get('#alias').clear()
      cy.validarCampoOk('#alias', 'perto do bar tal')

      cy.get('#submitAddress').click()

      cy.wait(2000)

      cy.contains('ul.last_item', 'Rua Um').should('exist')

    })    

  })

  context('carrinho', () => {

    let vestido = 'Printed Summer Dress';

    it('produto indisponivel para a compra', () => {

      cy.areaLogada(email, randomString, nome)

      cy.selecionaTitulo("Women")

      cy.pesquisarProduto(vestido)

      cy.selProdutoPesquisado(vestido)

      cy.contains('#availability_statut', 'This product is no longer in stock with those attributes but is available with others.')

      cy.get('button[type="submit"][name="Submit"]').should('not.be.visible')

    })

   it('produto disponivel para a compra', () => {

      cy.areaLogada(email, randomString, nome)

      cy.selecionaTitulo("Women")

      cy.pesquisarProduto(vestido)

      cy.selProdutoPesquisado(vestido)

      cy.get('#group_1').select(1)                      //vai pelo index, para ir pelo value seria: cy.get('#group_1').select("1")

      cy.contains('#availability_value', 'In stock')

      cy.get('button[type="submit"][name="Submit"]').should('exist')
 
    })

    it('adicionar produto ao carrinho', () => {

      cy.areaLogada(email, randomString, nome)

      cy.selecionaTitulo("Women")

      cy.pesquisarProduto(vestido)

      cy.selProdutoPesquisado(vestido)

      cy.get('#group_1').select(1)                      

      cy.contains('#availability_value', 'In stock')

      cy.botaoCarrinho()

      cy.get('.button-medium > span').click()

      cy.get('.heading-counter').contains('product')
 
    })

  })

})