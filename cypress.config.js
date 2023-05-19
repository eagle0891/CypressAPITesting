const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // "reporter": "cypress-mochawesome-reporter",
  "reporter": "junit",
  "reporterOptions": {
    "mochaFile": "results/results-[hash].xml"
  },
  e2e: {
    // specPattern: "cypress/e2e/**/*.*",
    specPattern: "cypress/e2e/UITests/*/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    "retries": {
      // Configure retry attempts for `cypress run`
      "runMode": 0,
      // Configure retry attempts for `cypress open`
      "openMode": 0
    },
    "screenshotsFolder": "cypress/reports/mochareports/assets",
    "screenshotOnRunFailure": true,
    "video": false,
    "chromeWebSecurity": false,
  },
});