import * as amazonModule from '../../../support/AmazonModules/amazon-module.cy'

const prop = require("../../../fixtures/amazon-properties.json")

describe('Homepage navigation', () => {
    before('Visit site', function(){
        amazonModule.visitAmazonAndAcceptCookies()
    })

    it('Navigate to homepage', () => {
        // cy.log(this.tests.parent.title)
        amazonModule.assertElementIsVisible(amazonModule.getNavigationBar)
    })

    it('Sign in / sign-up navigation', () => {
        amazonModule.clickSignInLink()
        amazonModule.getSignInText().should('be.visible')
        amazonModule.clickCreateAccountButton()
        amazonModule.getCreateAccountText().should('be.visible')
        cy.go('back') //cy.go(-1)
        amazonModule.getSignInText().should('be.visible')
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

    it.only('Cookie test', () => {
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
})