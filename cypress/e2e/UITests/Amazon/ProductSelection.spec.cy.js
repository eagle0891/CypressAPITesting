import * as amazonModule from '../../../support/AmazonModules/amazon-module.cy'

const prop = require('../../../fixtures/amazon-properties.json')

describe('PLP test', () =>{

    beforeEach('Visit site', () => {
        amazonModule.visitAmazonAndAcceptCookies()
    })

    it('Select a specific product', () => {
        amazonModule.searchForItem(prop.searchTerm)
        amazonModule.clickSearchButton()

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
                cy.log(prop.searchTerm + ' product price: ' + productPriceText)
                cy.log(prop.searchTerm + ' product image hyperlink: ' + productImage.attr('src'))
                productTitleLink.click()
            }
        })
    })
})