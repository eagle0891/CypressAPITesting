const prop = require('../../fixtures/amazon-properties.json')

export const visitAmazonAndAcceptCookies = () => {
    cy.viewport('macbook-16')
    cy.visit(prop.baseUriProtocol + '//' + prop.baseUriHost)
    cy.get(prop.acceptCookiesButton).click()
}

//get assets
export const getNavigationBar = () => {
    return cy.get(prop.NavigationBar)
}

export const getcreateAccountButton = () => {
    return cy.get(prop.createAccountButton)
}

export const getSignInLink = () => {
    return cy.get(prop.signInLink)
}

export const getSignInText = () => {
    return cy.contains(prop.signInText)
}

export const getCreateAccountText = () => {
    return cy.contains(prop.createAccountText)
}

//actions

export const searchForItem = (value) => {
    cy.get(prop.searchField).type(value)
}

export const clickSearchButton = () => {
    cy.get(prop.searchButton).click()
}

export const getProductGalleryTile = () => {
    return cy.get(prop.plpProductGalleryTile)
}

export const clickSignInLink = () => {
    cy.get(prop.signInLink).click()
}

export const clickCreateAccountButton = () => {
    cy.get(prop.createAccountButton).click()
}

export const verifyUriProtocols = () => {
    cy.location('protocol').should('eq', prop.baseUriProtocol)
    cy.location('host').should('eq', prop.baseUriHost)
}

//generic actions - to review
export const assertTextIsVisible = (text) => {
    cy.contains(text).should('be.visible')
}

export const assertElementIsVisible = (element) => {
    cy.get(element).should('be.visible')
}

export const clickElement = (element) => {
    cy.get(element).click()
}

export const catchException = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('b.cardModuleFactory is not a function')) {
            return false
          }
          if (err.message.includes('jQuery already registered by AmazonUIjQuery, reregistered by AmazonUIjQuery')) {
            return false
          }
          if (err.message.includes('EmeNotSupportedError:')) {
            return false
          }
          if (err.message.includes('EmeNotSupportedError:')) {
            return false
          }
    })
}


