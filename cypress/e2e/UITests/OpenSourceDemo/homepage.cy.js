describe("Navigate to open source demo site", () => {
    
    it("verify the url is correct", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/')
        .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.title().should('include', 'Orange')
        .and('eq', 'OrangeHRM')
    })
})