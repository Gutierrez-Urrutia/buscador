describe('Edit', () => {
  beforeEach(() => {
    cy.visit('/edit/1')
  });

  it('should allow viewing a person', () => {
    cy.get('h3').should('have.text', 'Martín González');
    cy.get('#name').should('have.value', 'Martín González');
    cy.get('#street').should('have.value', 'Avenida Providencia 1234');
    cy.get('#city').should('have.value', 'Santiago');
  });

  it('should allow updating a name', () => {
    cy.get('#name').type(' Test');
    cy.get('#save').click();
    const list = cy.get('app-search mat-list mat-list-item');
    list.should('have.length', 1);
  });
});
