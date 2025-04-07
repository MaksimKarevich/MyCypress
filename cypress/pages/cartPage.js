export class CartPage {
  // Повертає заголовок сторінки
  pageTitle() {
    return cy.get('.title');
  }

  // Повертає всі товари в кошику
  cartItems() {
    return cy.get('.cart_item');
  }

  // Натискає кнопку "Remove" для товару за імʼям
  removeItemByName(productName) {
    cy.contains('.inventory_item_name', productName)
      .parents('.cart_item')
      .find('button')
      .click();
  }

  // Натискає кнопку Checkout
  clickCheckout() {
    cy.get('[data-test="checkout"]').click();
  }

  // Натискає кнопку "Continue Shopping"
  clickContinueShopping() {
    cy.get('[data-test="continue-shopping"]').click();
  }

  // Додає товар до кошика за його назвою
  addToCartByName(productName) {
    cy.contains('.inventory_item_name', productName)
      .parents('.inventory_item')
      .find('button')
      .click();
  }

  // Повертає іконку кошика в шапці
  get cartLink() {
    return cy.get('.shopping_cart_link');
  }
}
