const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    timeout: 30000,

    expect: {
        timeout: 5000
    },

    reporter: 'html',

    use: {

        baseURL: 'https://www.saucedemo.com',

        headless: true,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'on-first-retry'

    },

    projects: [

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome']
            }
        }

    ]

});