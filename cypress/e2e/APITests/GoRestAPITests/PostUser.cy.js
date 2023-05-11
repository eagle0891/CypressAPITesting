/// <reference types = "Cypress" />

describe('post user requesty', () => {
    let bearerToken = '4960e8713a21406e3951a521e574734a2e0fea103f35544bad5d450914c4a30a'
    let baseUrl = 'https://gorest.co.in/public/v2'

    let randomText = ""
    let testEmail = ""

    const dataJson = require('../../fixtures/createUser') //if using this then remove the "cy.fixture('createUser').then((payload) => " and surrounding braces and replace "payload" with "dataJson"

    it('create a user', () => {

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@exampleemail.com'

        // cy.fixture('createUser').then((payload) => {

            cy.request({
                method: 'POST',
                url: baseUrl + '/users/',
                headers: {
                'authorization': 'Bearer ' + bearerToken
                },
                body: {
                    "name": dataJson.name,
                    "email": testEmail,
                    "gender": dataJson.gender,
                    "status": dataJson.status
                }
            }).then((res) => {
                // cy.log("****** Response body is " + JSON.stringify(res) + " **********")
                expect(res.status).to.eq(201)
                expect(res.body).has.property('id')
                expect(res.body).has.property('name', dataJson.name)
                expect(res.body).has.property('email', testEmail)
                expect(res.body).has.property('gender', dataJson.gender)
                expect(res.body).has.property('status', dataJson.status)
            }).then((res) => {
                cy.log("*********Response is " + JSON.stringify(res) + "***************")
                    const userId = res.body.id
                    cy.log("***** User id is " + userId + " ***********")
                    //verify the user request contains then new user
                    cy.request({
                        method: 'GET',
                        url: baseUrl + '/users/' + userId,
                        headers: {
                        'authorization': 'Bearer ' + bearerToken
                        }
                    }).then((res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body).has.property('id', userId)
                        expect(res.body).has.property('name', dataJson.name)
                        expect(res.body).has.property('email', testEmail)
                        expect(res.body).has.property('gender', dataJson.gender)
                        expect(res.body).has.property('status', dataJson.status)
                })
            })
        // })
    })
})