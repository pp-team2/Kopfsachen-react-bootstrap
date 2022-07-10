describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.viewport(550, 750)
    cy.visit('/')
    cy.contains('Herzlich Willkommen!')
  })
})
