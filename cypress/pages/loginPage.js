export class LoginPage {
  // Відкриває головну сторінку сайту (логін)
  visit() {
    cy.visit('/');
  }

  // Логується використовуючи креденшіали з .env
  loginWithEnvCredentials() {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  }
}
