import { LoginPage } from '../pages/loginPage';
require('dotenv').config();

describe('Login tests', () => {
  beforeEach(() => {
    console.log('Running in ENV:', Cypress.env('environment'));
  });

  const loginPage = new LoginPage();

  afterEach(() => {
    cy.clearSession();
  });

  it('logs in with valid credentials', () => {
    // Відкриваємо сайт
    loginPage.visit();

    console.log('Username from test:', Cypress.env('CYPRESS_username'));
    console.log('Password from test:', Cypress.env('CYPRESS_password'));
    // Вхід з даними з .env
    loginPage.login(
      Cypress.env('CYPRESS_username'),
      Cypress.env('CYPRESS_password')
    );

    // Перевіряємо, що після логіну перекинуло на сторінку з товарами
    cy.url().should('include', '/inventory.html');
    loginPage.pageTitle().should('have.text', 'Products');
    loginPage.inventoryItems().should('have.length.greaterThan', 0);
  });

  it('logs out after successful login', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вхід з даними з .env
    loginPage.login(
      Cypress.env('CYPRESS_username'),
      Cypress.env('CYPRESS_password')
    );

    // Відкриваємо меню і натискаємо Logout
    loginPage.openMenu();
    loginPage.logout();

    // Перевіряємо, що повернулись на логін-сторінку
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('check login for invalid user', () => {
    // Відкриваємо сайт
    cy.visit('/');

    // Завантажуємо фікстуру з користувачами
    cy.fixture('users').then((data) => {
      loginPage.fillUsername(data.invalidUser.username);
      loginPage.fillPassword(data.invalidUser.password);
      loginPage.submit();

      // Перевіряємо, що зʼявилась помилка
      loginPage.errorMessage().should('be.visible');
      loginPage
        .errorMessage()
        .should(
          'contain',
          'Username and password do not match any user in this service'
        );
    });
  });

  it('check login for blocked user', () => {
    // Відкриваємо сайт
    cy.visit('/');

    // Завантажуємо фікстуру з користувачами
    cy.fixture('users').then((data) => {
      loginPage.fillUsername(data.lockedOutUser.username);
      loginPage.fillPassword(data.lockedOutUser.password);
      loginPage.submit();

      // Перевіряємо, що зʼявилась помилка
      loginPage.errorMessage().should('be.visible');
      loginPage
        .errorMessage()
        .should('contain', 'Sorry, this user has been locked out.');
    });
  });
});
