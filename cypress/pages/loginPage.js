export class LoginPage {
  // Відкриває головну сторінку сайту (логін)
  visit() {
    cy.visit('/');
  }

  // Вводить логін
  fillUsername(username) {
    cy.get('[data-test="username"]').type(username);
  }

  // Вводить пароль
  fillPassword(password) {
    cy.get('[data-test="password"]').type(password);
  }

  // Натискає кнопку логіну
  submit() {
    cy.get('[data-test="login-button"]').click();
  }

  // Логінемось використовуючи передані креденшіали з тесту
  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  // Повертає заголовок сторінки
  pageTitle() {
    return cy.get('.title');
  }

  // Повертає список товарів
  inventoryItems() {
    return cy.get('.inventory_item');
  }

  // Повертає елемент з повідомленням про помилку
  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  // Відкриває меню бургер
  openMenu() {
    cy.get('#react-burger-menu-btn').click();
  }

  // Натискає на кнопку logout у сайдбарі
  logout() {
    cy.get('#logout_sidebar_link').click();
  }
}
