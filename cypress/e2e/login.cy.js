import { LoginPage } from '../pages/loginPage';

describe('Login tests', () => {
  beforeEach(() => {
    console.log('Running in ENV:', Cypress.env('environment'));
  });

  const loginPage = new LoginPage();

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('logs in with valid credentials', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вхід з даними з .env
    loginPage.loginWithEnvCredentials();

    // Перевіряємо, що після логіну перекинуло на сторінку з товарами
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
  });

  it('logs out after successful login', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вхід з даними з .env
    loginPage.loginWithEnvCredentials();

    // Відкриваємо меню і натискаємо Logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    // Перевіряємо, що повернулись на логін-сторінку
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('check login for invalid user', () => {
    // Відкриваємо сайт
    cy.visit('/');

    // Завантажуємо фікстуру з користувачами
    cy.fixture('users').then((data) => {
      cy.get('[data-test="username"]').type(data.invalidUser.username);
      cy.get('[data-test="password"]').type(data.invalidUser.password);
      cy.get('[data-test="login-button"]').click();

      // Перевіряємо, що зʼявилась помилка
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should(
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
      cy.get('[data-test="username"]').type(data.lockedOutUser.username);
      cy.get('[data-test="password"]').type(data.lockedOutUser.password);
      cy.get('[data-test="login-button"]').click();

      // Перевіряємо, що зʼявилась помилка
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should(
        'contain',
        'Sorry, this user has been locked out.'
      );
    });
  });
});
