/// <reference types = "Cypress" />

describe('get users', ()=>{
    let bearerToken = '4960e8713a21406e3951a521e574734a2e0fea103f35544bad5d450914c4a30a'
    let baseUrl = 'https://gorest.co.in/public/v2'

    it('get users', ()=>{
        cy.request({
            method: 'GET',
            url: baseUrl + '/users/',
            
            headers: {
            'authorization': 'Bearer ' + bearerToken
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
        })
    })

    it('get users by ID', ()=>{
        cy.request({
            method: 'GET',
            url: baseUrl + '/users/1526177',
            headers: {
                'authorization': 'Bearer ' + bearerToken
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Vimala Trivedi III')
        })
    })
})   