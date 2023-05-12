import * as amazonModule from '../../../support/AmazonModules/amazon-module.cy'

const prop = require('../../../fixtures/amazon-properties')

describe('Interact with list of elements', () =>{

    before('Visit site', function(){
        amazonModule.visitAmazonAndAcceptCookies()
    })

    it('Interact with list of elements', () => {
        // productItem.get('.s-line-clamp-1 .a-size-base-plus.a-color-base').should('contain.text', 'Casio') //.first().click()
    })
})