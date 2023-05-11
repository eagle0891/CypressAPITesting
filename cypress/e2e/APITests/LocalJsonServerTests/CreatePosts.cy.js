/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker';

const bookName = faker.random.words();
const authorName = faker.name.fullName();

// const bookName = Cypress._.range(1, 1).map((_, k) => {
//     return {
//         title: faker.name.findName(),
//     }
// })

// const authorName = Cypress._.range(1, 1).map((_, k) => {
//     return {
//         author: faker.name.findName()
//     }
// })

describe('create post', () => {

    const properties = require('../../fixtures/properties')
    let baseUrl =  properties.baseUrl
    let path = properties.postsPath 

    it('create posts', () => {
        cy.request({
            method: 'POST',
            url: baseUrl + path,
            body: {
                    "title": bookName,
                    "author": authorName
                    }
        }).then((res) => {
            expect(res.status).to.eq(201)
            cy.log("***** RESPONSE BODY IS >>>>>>> " + JSON.stringify(res) + " <<<<<<<< END OF BODY ******")
        })
    })
})