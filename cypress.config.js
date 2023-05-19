const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "reporter": "cypress-mochawesome-reporter",
  e2e: {
    // specPattern: "cypress/e2e/**/*.*",
    specPattern: "cypress/e2e/UITests/Amazon",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    "retries": {
      // Configure retry attempts for `cypress run`
      "runMode": 3,
      // Configure retry attempts for `cypress open`
      "openMode": 3
    },
    "screenshotsFolder": "cypress/reports/mochareports/assets",
    "screenshotOnRunFailure": true,
    "video": true,
    "chromeWebSecurity": false,
    // "reporter": "cypress-multi-reporters",
    // "reporterOptions": {
    //     "reporterEnabled": "mochawesome",
    //     "mochawesomeReporterOptions": {
    //         "reportDir": "cypress/reports/mocha",
    //         "quite": true,
    //         "overwrite": false,
    //         "html": false,
    //         "json": true
    //     }
    // }
  },
});