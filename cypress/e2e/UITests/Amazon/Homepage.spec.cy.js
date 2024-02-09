import * as amazonModule from '../../../support/AmazonModules/amazon-module.cy'

const prop = require("../../../fixtures/amazon-properties.json")

describe('Homepage navigation', () => {
    beforeEach('Visit site', function(){
        amazonModule.visitAmazonAndAcceptCookies()
    })

    it('Navigate to homepage', () => {
        // cy.log(this.tests.parent.title)
        amazonModule.assertElementIsVisible(amazonModule.getNavigationBar)
    })

    it.only('Sign in / sign-up navigation', () => {
        amazonModule.clickSignInLink()
        //amazonModule.getSignInText().should('be.visible')
        amazonModule.clickCreateAccountButton()
        amazonModule.getCreateAccountText().should('be.visible')
        cy.go('back') //cy.go(-1)
        //amazonModule.getSignInText().should('be.visible')
        cy.go('forward') //cy.go(1)
        amazonModule.getCreateAccountText().should('be.visible')
    })

    it('Local storage', () => {
        expect(localStorage).length.to.be.greaterThan(0)
    })

    it('Clear local storage', () => {
        cy.clearLocalStorage()
    })

    it('Window Test - Uri properties', () => {
        cy.window().should(win => {
            const loc = win.location
            expect(loc.protocol).to.eql(prop.baseUriProtocol)
            expect(loc.host).to.eql(prop.baseUriHost)
        })
    })

    it('CY test - Uri properties', () => {
        amazonModule.verifyUriProtocols()
    })

    it('Page reload', () => {
        cy.reload()
    })

    it('Cookie test', () => {
        //create cookie
        cy.setCookie('CypressTestCookie', 'testcookie123456poiuy')
        //read cookie
        cy.getCookie('CypressTestCookie')
        //update cookie
        cy.setCookie('CypressTestCookie', 'testcookie123456poiuy-edit')
        cy.getCookie('CypressTestCookie')
        //clear cookie
        cy.clearCookie('CypressTestCookie')
        cy.getCookie('CypressTestCookie')
    })

    it('Verify Amazon logo is present', () => {
        cy.get('#nav-logo a[aria-label="Amazon.co.uk"]')
        .should('be.visible')
    })

    it('Click through header links and verify URL redirect', () => {
        cy.get('#nav-xshop .nav-a').as('headerLinks');
        cy.get('@headerLinks')
        .its('length')
        .then((len) => [...Array(len).keys()])
        .each((index) => {
            let extractedHref;
            cy.get('@headerLinks').eq(index).click()
            cy.get('@headerLinks').eq(index)  
            .invoke('attr', 'href')
            .then(href => {
                extractedHref = href;
            }).then(()=>{
                amazonModule.catchException();
                if(extractedHref=='/Kindle-eBooks-books/b/?ie=UTF8&node=341689031&ref_=nav_cs_kindle_books') {
                    cy.url().should('contain', 'https://www.amazon.co.uk').and('contain', '/kindle-dbs/storefront?storeType=browse');
                    
                }
                else {
                    const truncatedValue = extractedHref.substring(extractedHref.indexOf('?'));
                
                        cy.url().should('contain', 'https://www.amazon.co.uk').and('contain', truncatedValue);
                        // amazonModule.catchException();
                    }
                });
            amazonModule.catchException();
        })  
    })

    it('Add an item to cart', () => {

    })
})