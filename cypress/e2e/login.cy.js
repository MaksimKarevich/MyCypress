import { LoginPage } from '../pages/loginPage';

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

    // Вхід з даними з .env
    loginPage.login(Cypress.env('username'), Cypress.env('password'));

    // Перевіряємо, що після логіну перекинуло на сторінку з товарами
    cy.url().should('include', '/inventory.html');
    loginPage.pageTitle().should('have.text', 'Products');
    loginPage.inventoryItems().should('have.length.greaterThan', 0);
  });

  it('logs out after successful login', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вхід з даними з .env
    loginPage.login(Cypress.env('username'), Cypress.env('password'));

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

  it('should show error when username and password are empty', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Відправляємо форму без введення логіна і паролю
    loginPage.submit();

    // Перевіряємо повідомлення про помилку
    loginPage.errorMessage().should('be.visible');
    loginPage.errorMessage().should('contain', 'Username is required');
  });

  it('should show error when username is missing', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вводимо тільки пароль
    loginPage.fillPassword('somePassword');
    loginPage.submit();

    // Перевіряємо повідомлення про помилку
    loginPage.errorMessage().should('be.visible');
    loginPage.errorMessage().should('contain', 'Username is required');
  });

  it('should show error when password is missing', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вводимо тільки логін
    loginPage.fillUsername('someUser');
    loginPage.submit();

    // Перевіряємо повідомлення про помилку
    loginPage.errorMessage().should('be.visible');
    loginPage.errorMessage().should('contain', 'Password is required');
  });
});
