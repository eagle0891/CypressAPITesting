const prop = require("../../../fixtures/amazon-properties.json")

describe('Homepage navigation', () => {
    before('Visit site', function(){
        cy.viewport('iphone-8')
        cy.visit(prop.baseUriProtocol + '//' + prop.baseUriHost)
        cy.get(prop.acceptCookiesButton).click()
    })

    it('Navigate to homepage', () => {
        // cy.log(this.tests.parent.title)
        cy.get(prop.NavigationBar).should('be.visible')
    })

    it('Sign in / sign-up navigation', () => {
        cy.get(prop.signInLink).click()
        cy.contains(prop.signInText).should('be.visible')
        cy.get(prop.createAccountButton).click()
        cy.contains(prop.createAccountText).should('be.visible')
        cy.go('back') //cy.go(-1)
        cy.contains(prop.signInText).should('be.visible')
        cy.go('forward') //cy.go(1)
        cy.contains(prop.createAccountText).should('be.visible')
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
        cy.location('protocol').should('eq', prop.baseUriProtocol)
        cy.location('host').should('eq', prop.baseUriHost)
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