describe('Pruebas de funcionalidad - Inicio de sesión', () => {
    it('Visita la página principal de UFC', () => {
        cy.visit('http://localhost:3000') 

        cy.contains('Iniciar sesión').click()

        cy.url().should('include', '/login')
    })

    it('Falla cuando el correo está vacío', () => {
        cy.get('#password')
          .type('foo')

        cy.contains('Entrar').click()
        cy.contains('Campo obligatorio')

        cy.get('input').clear()
    })

    it('Falla cuando la contraseña está vacía', () => {
        cy.get('#email')
          .type('foo')

        cy.contains('Entrar').click()
        cy.contains('Campo obligatorio')

        cy.get('input').clear()
    })

    it('Falla cuando ambos campos están vacíos', () => {
        cy.contains('Entrar').click()
        cy.contains('Campo obligatorio')
    })

    it('Falla cuando el correo no existe', () => {
        cy.get('#email')
          .type('Este correo no existe')

        cy.get('#password')
          .type('Esta contraseña menos')

        cy.contains('Entrar').click()
        cy.contains('Contraseña y/o correo electrónico inválidos')
        cy.get('input').clear()
    })

    it('Falla cuando la contraseña es incorrecta', () => {
        cy.get('#email')
          .type('admin')

        cy.get('#password')
          .type('bad password')

        cy.contains('Entrar').click()
        cy.contains('Contraseña y/o correo electrónico inválidos')
        cy.get('input').clear()
    })

    it('Inicia sesión cuando ambos campos son correctos', () => {
        cy.get('#email')
          .type('admin')

        cy.get('#password')
          .type('admin')

        cy.contains('Entrar').click()
        cy.contains('Gestión')
    })
})
