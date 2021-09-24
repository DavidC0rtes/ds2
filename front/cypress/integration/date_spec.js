describe('Pruebas de funcionalidad - Fecha de cumpleaños', () => {
    it('Visitamos un perfil de usuario logueados como administrador', () => {
        cy.visit('http://localhost:3000/login')
        
        cy.get('#email')
          .type('admin')

        cy.get('#password')
          .type('admin')

        cy.contains('Entrar').click()
        cy.wait(2000)
        cy.contains('Pérfil').click()

    })

    it('Error al recibir una fecha la cual hace que el cliente sea menor de edad', () => {

      cy.contains('Editar').click()
        cy.get('[name=birthday]')
          .type('2010-01-01')

        cy.contains('Guardar').click()
        cy.contains('Ha ocurrido un error')

    })

    it('Error al recibir una fecha la cual hace que el cliente tenga más de 200 años', () => {
        cy.contains('Editar').click()
        cy.get('[name=birthday]')
          .type('1821-01-01')

        cy.contains('Guardar').click()
        cy.contains('Ha ocurrido un error')

    })

    it('Se actualiza al recibir una fecha la cual hace que el cliente tenga más de 18 y menos de 200 años de edad', () => {
        cy.contains('Editar').click()
        cy.get('[name=birthday]')
          .type('2000-09-22')

        cy.contains('Guardar').click()
        cy.contains('¡Actualizado con éxito!')

    })
})
