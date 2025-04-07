import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';

describe('Cart tests', () => {
  beforeEach(() => {
    console.log('Running in ENV:', Cypress.env('environment'));
  });

  const cartPage = new CartPage();
  const loginPage = new LoginPage();

  afterEach(() => {
    cy.clearSession();
  });

  beforeEach(() => {
    // Логінемось перед кожним тестом
    loginPage.visit();
    loginPage.login(Cypress.env('username'), Cypress.env('password'));

    // Переходимо на сторінку кошика
    cartPage.cartLink.click();
  });

  afterEach(() => {
    cy.clearSession();
  });

  it('should display cart page with correct title', () => {
    // Перевіряємо заголовок сторінки кошика
    cartPage.pageTitle().should('have.text', 'Your Cart');
  });

  it('should add item to cart and display it', () => {
    // Переходимо назад до сторінки з товарами
    cartPage.clickContinueShopping();

    // Додаємо товар до кошика
    cartPage.addToCartByName('Sauce Labs Backpack');

    // Переходимо до кошика
    cartPage.cartLink.click();

    // Перевіряємо, що товар зʼявився в кошику
    cartPage.cartItems().should('have.length', 1);
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('exist');
  });

  it('should remove item from cart', () => {
    // Переходимо назад до сторінки з товарами
    cartPage.clickContinueShopping();

    // Додаємо товар до кошика
    cartPage.addToCartByName('Sauce Labs Backpack');

    // Переходимо до кошика
    cartPage.cartLink.click();

    // Видаляємо товар
    cartPage.removeItemByName('Sauce Labs Backpack');

    // Перевіряємо, що товар зник з кошика
    cartPage.cartItems().should('have.length', 0);
  });

  it('should go to checkout page when clicking checkout', () => {
    // Переходимо назад до сторінки з товарами
    cartPage.clickContinueShopping();

    // Додаємо товар до кошика
    cartPage.addToCartByName('Sauce Labs Backpack');

    // Переходимо до кошика
    cartPage.cartLink.click();

    // Натискаємо Checkout
    cartPage.clickCheckout();

    // Перевіряємо URL сторінки оформлення замовлення
    cy.url().should('include', '/checkout-step-one.html');
  });

  it('should add multiple items to cart and display them', () => {
    // Перевіряємо додавання кількох товарів
    cartPage.clickContinueShopping();
    cartPage.addToCartByName('Sauce Labs Backpack');
    cartPage.addToCartByName('Sauce Labs Bike Light');
    cartPage.cartLink.click();
    cartPage.cartItems().should('have.length', 2);
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('exist');
    cy.contains('.inventory_item_name', 'Sauce Labs Bike Light').should(
      'exist'
    );
  });

  it('should return to inventory when clicking Continue Shopping', () => {
    // Перевіряємо повернення на сторінку товарів
    cartPage.clickContinueShopping();
    cy.url().should('include', '/inventory.html');
  });

  it('should show correct number on cart icon badge', () => {
    // Перевіряємо бейджик кількості товарів у кошику
    cartPage.clickContinueShopping();
    cartPage.addToCartByName('Sauce Labs Backpack');
    cartPage.addToCartByName('Sauce Labs Bike Light');
    cartPage.cartLink.should('contain.text', '2');
  });
});
