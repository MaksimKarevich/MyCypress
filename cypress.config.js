const { defineConfig } = require('cypress');
require('dotenv').config(); // завантажує .env

module.exports = defineConfig({
  env: {
    apiUrl: 'https://api.saucedemo.com',
    environment: 'qa',
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: process.env.CYPRESS_baseUrl,
    setupNodeEvents(on, config) {
      // Прокидаємо змінні в Cypress.env()
      config.env.username = process.env.CYPRESS_username;
      config.env.password = process.env.CYPRESS_password;

      // Додаємо налаштування для запуску браузера
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Вимикаємо підказки Chrome щодо збереження паролів
          launchOptions.args.push(
            '--disable-password-generation',
            '--disable-save-password-bubble',
            '--disable-features=PasswordManagerOnboarding,PasswordCheck'
          );
        }
        return launchOptions;
      });

      return config;
    },
  },
});
