///<reference types = "Cypress" />

const properties = require('../../fixtures/properties')
let baseUrl = properties.baseUrl
let path = properties.postsPath

describe('delete post', () => {
    
    it('delete post', () => {
        cy.request({
            method: 'DELETE',
            url: baseUrl + path + '13'
        })
    })
})