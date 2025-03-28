import { LoginPage } from '../pages/loginPage';

describe('Login tests', () => {
  const loginPage = new LoginPage();

  it('logs in with valid credentials', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вводимо правильний логін і пароль
    loginPage.fillUsername('standard_user');
    loginPage.fillPassword('secret_sauce');

    // Натискаємо логін
    loginPage.submit();

    // Перевіряємо, що після логіну перекинуло на сторінку з товарами
    cy.url().should('include', '/inventory.html');
  });

  it('shows error on invalid login', () => {
    // Відкриваємо сайт
    loginPage.visit();

    // Вводимо неправильний логін і пароль
    loginPage.fillUsername('wrong_user');
    loginPage.fillPassword('wrong_pass');

    // Натискаємо логін
    loginPage.submit();

    // Перевіряємо, що зʼявилась помилка
    loginPage.verifyErrorMessageVisible();
  });
});
