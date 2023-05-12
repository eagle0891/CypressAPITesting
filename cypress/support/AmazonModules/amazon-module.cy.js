const prop = require('../../fixtures/amazon-properties')

export const visitAmazonAndAcceptCookies = () => {
    cy.viewport('macbook-16')
    cy.visit(prop.baseUriProtocol + '//' + prop.baseUriHost)
    cy.get(prop.acceptCookiesButton).click()
}

export const searchForItem = (value) => {
    cy.get(prop.searchField).type(value)
}

export const clickSearchButton = () => {
    cy.get(prop.searchButton).click()
}

export const getProductGalleryTile = () => {
    return cy.get(prop.plpProductGalleryTile)
}