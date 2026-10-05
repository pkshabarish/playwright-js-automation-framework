const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const loginData = require('../../data/loginData.json');

test.describe('Data Driven Negative Login Tests', () => {

    for (const data of loginData) {

        test(`should display error for ${data.scenario}`, async ({ page }) => {

            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login(data.username, data.password);
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText(data.expectedError);

        });

    }

});