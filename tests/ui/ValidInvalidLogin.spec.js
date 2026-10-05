const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const ValidInvalidData = require('../../data/ValidInvalidData.json');

test.describe('Data Driven Login Tests', () => {

    for (const data of ValidInvalidData) {

        test(`Login validation - ${data.scenario}`, async ({ page }) => {

            const loginPage = new LoginPage(page);

            await loginPage.navigate();

            await loginPage.login(
                data.username,
                data.password
            );

            if (data.expectedResult === 'error') {

                await expect(loginPage.errorMessage)
                    .toBeVisible();

                await expect(loginPage.errorMessage)
                    .toContainText(data.expectedError);

            } else {

                await expect(page)
                    .toHaveURL(/inventory/);

            }

        });

    }

});