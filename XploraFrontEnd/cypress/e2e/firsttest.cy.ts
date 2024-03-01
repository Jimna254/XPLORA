describe('template spec', () => {
  beforeEach(() => {});

  it('passes', () => {
    cy.visit('http://localhost:4200');

    cy.get('h1');
    cy.get('[data-cy="loginLink"]');
  });

  it('navigates to login page', () => {
    cy.visit('http://localhost:4200');
    cy.get('[data-cy="loginLink"]').click();
    cy.get('[data-cy="email"]').type('jameskw218@gmail.com');
    cy.get('[data-cy="password"]').type('123456789');
    cy.get('.btn').click();

    cy.contains('Categories');
  });
});
