import * as amazonModule from '../../../support/AmazonModules/amazon-module.cy'

const prop = require('../../../fixtures/amazon-properties.json')

describe('PLP test', () =>{

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })

    beforeEach('Visit site', () => {
        amazonModule.visitAmazonAndAcceptCookies()
        amazonModule.catchException();
    })

    it('Select a specific product and add to cart', () => {
        amazonModule.searchForItem(prop.searchTerm)
        amazonModule.clickSearchButton()
        amazonModule.catchException();

        const productItemList = amazonModule.getProductGalleryTile()
        productItemList.should('have.length.gt', 0)

        productItemList
        .each(($element) => {
            const productBrandText = $element.find(prop.productBrandText).text()
            const productTitleLinkText = $element.find(prop.productTitleLink).text()
            const productPriceText = $element.find(prop.productPrice).text()
            const productImage = $element.find(prop.productImage)
            const productTitleLink = $element.find(prop.productTitleLink)
            if(productBrandText==prop.brandTerm){
                cy.log(prop.searchTerm + ' brand: ' + productBrandText)
                cy.log(prop.searchTerm + ' product link title: ' + productTitleLinkText)
                cy.log(prop.searchTerm + ' product price: ' + productPriceText.substring(productPriceText.indexOf('£') + 1))
                cy.log(prop.searchTerm + ' product image hyperlink: ' + productImage.attr('src'))
                productTitleLink.click()
                amazonModule.catchException();
            }
        }).then(() => {
            cy.get('#breadcrumb-back-link').should('be.visible');
            cy.get('body').then(($body) => {
                if ($body.find('#add-to-cart-button').length > 0) {
                    cy.log("*** Add to cart button is displayed ***")
                    cy.get('#add-to-cart-button').click();
                } else {
                    cy.log("*** Add to cart button is NOT displayed ***")
                    cy.get('#buybox-see-all-buying-choices .a-button-inner:nth-child(1)').click()
                    cy.get('#all-offers-display #all-offers-display-scroller:nth-child(1)').should('be.visible')
                    cy.get('span#a-autoid-2-offer-1 .a-button-input').click();
                }
            }) 
        }).then(() => {
            //Check the substotal price
            cy.get('.sw-subtotal-amount .a-offscreen').then(($priceText) => { 
                const priceString = $priceText.text();
                const truncatedPriceValue = priceString.substring(priceString.indexOf('£') + 1)
                cy.log("*** The cart's total price is: " + truncatedPriceValue);
            })
        })
    })
})