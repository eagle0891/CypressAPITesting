import * as amazonModule from '../../../support/AmazonModules/amazon-module.cy'

const prop = require('../../../fixtures/amazon-properties')

describe('PLP test', () =>{

    before('Visit site', function(){
        amazonModule.visitAmazonAndAcceptCookies()
    })

    it('Select a specific product', () => {
        amazonModule.searchForItem('watch')
        amazonModule.clickSearchButton()

        const productItem = amazonModule.getProductGalleryTile()
        productItem.should('have.length.gt', 0)

        productItem
        .each(($element) => {
            const productBrandText = $element.find(prop.productBrandText).text()
            const productTitleLinkText = $element.find(prop.productTitleLink).text()
            const productPriceText = $element.find(prop.productPrice).text()
            const productImage = $element.find(prop.productImage)
            const productTitleLink = $element.find(prop.productTitleLink)
            if(productBrandText=='Casio'){
                cy.log('Casio brand: ' + productBrandText)
                cy.log('Casio product link title: ' + productTitleLinkText)
                cy.log('Casio product price: ' + productPriceText)
                cy.log('Casio product image hyperlink: ' + productImage.attr('src'))
                productTitleLink.click()
            }
        })
    })
})