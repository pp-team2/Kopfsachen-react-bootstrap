describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('Herzlich Willkommen!')
    cy.contains('Wiki').click()
    cy.contains('Willkommen im Wiki')
    cy.contains('Abc Modell')
    cy.visit('/starkmacher')
    cy.contains('Mit Accountkey anmelden:')
    cy.contains('Neues Benutzerkonto erstellen').click()
    cy.contains('Meine Starkmacher')
    cy.contains('ABCDEF')
  })
})
