/// <reference types="cypress"/>

describe('Buscar Dispositivos', () => {

    it('Buscar dispositivos específico', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects/3"
        })
            .then((resultado) => {
                //será executado quando a requisição responder
                expect(resultado.status).equal(200)
                expect(resultado.body.id).equal('3')
                expect(resultado.body.name).equal('Apple iPhone 12 Pro Max')
            })
    })

    it('Buscar dispositivos inexistentes', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects/dsadsa231",
            failOnStatusCode: false
        })
        .then((resultado) => {
            //será executado quando a requisição responder
            expect(resultado.status).equal(404)
            expect(resultado.body.error).equal('Oject with id=dsadsa231 was not found.')
        })
    })

    it('Incluir novo dispositivo', () => {
        cy.request({
            method: "POST",
            url: "https://api.restful-api.dev/objects",
            body: {
                "name": "Teste Forti",
                "data": {
                   "year": 2025,
                   "price": 2021.57,
                   "CPU model": "Intel Extreme",
                   "Hard disk size": "2 TB"
                }
             },
             failOnStatusCode: false
        })
        .then((resultado) => {
            //será executado quando a requisição responder
            expect(resultado.status).equal(200)
            expect(resultado.body.name).equal('Teste Forti')
        })
    })

    it('Alterar dispositivo', () => {
        cy.request({
            method: "PUT",
            url: "https://api.restful-api.dev/objects/ff808181932badb60195becb696d1d42",
            body: {
                "id": "ff808181932badb60195becb696d1d42",
                "name": "Alterando o Código 123",
                "data": {
                    "year": 2025,
                    "price": 2052.57,
                    "CPU model": "Intel Extreme",
                    "Hard disk size": "2 TB"
                }
            },
             failOnStatusCode: false
        })
        .then((resultado) => {
            //será executado quando a requisição responder
            expect(resultado.status).equal(200)
        })
    })

    it('Confirmando a alteração de todos os dados do dispositivo', () => {
        cy.request({
            method: "GET",
            url: "https://api.restful-api.dev/objects/ff808181932badb60195becb696d1d42",
             failOnStatusCode: false
        })
        .then((resultado) => {
            //será executado quando a requisição responder
            expect(resultado.status).equal(200)
            expect(resultado.body.name).equal('Alterando o Código 123')
            expect(resultado.body.data.year).equal(2025)
            expect(resultado.body.data.price).equal(2052.57)
            expect(resultado.body.data["CPU model"]).equal("Intel Extreme")
            expect(resultado.body.data["Hard disk size"]).equal("2 TB")

        })
    })

})

