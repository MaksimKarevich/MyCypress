export const users = {
  valid: {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  },
  invalid: {
    username: 'wrong_user',
    password: 'wrong_pass',
  },
};
