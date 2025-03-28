export class LoginPage {
  // Відкриває головну сторінку сайту (логін)
  visit() {
    cy.visit('/');
  }

  // Вводить юзернейм у відповідне поле
  fillUsername(username) {
    cy.get('[data-test="username"]').type(username);
  }

  // Вводить пароль у відповідне поле
  fillPassword(password) {
    cy.get('[data-test="password"]').type(password);
  }

  // Натискає кнопку "Login"
  submit() {
    cy.get('[data-test="login-button"]').click();
  }

  // Перевіряє, що зʼявилось повідомлення про помилку
  verifyErrorMessageVisible() {
    cy.get('[data-test="error"]').should('be.visible');
  }
}
