describe('Home', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Directorio de Colaboradores')
    cy.contains('Buscador')
  })
})
