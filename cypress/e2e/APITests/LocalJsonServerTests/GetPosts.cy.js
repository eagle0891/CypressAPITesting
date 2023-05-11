///<reference types = "Cypress" />

describe('get posts', () => {
    const properties = require('../../fixtures/properties')
    let baseUrl =  properties.baseUrl
    let path = properties.postsPath 

    it('get posts', () => {
        cy.request({
            method: 'GET',
            url: baseUrl + path
        }).then((res) => {
            expect(res.status).to.eq(200)
        })
    })
})
