const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Negative Login Tests', () => {

    test('should display error when username is empty', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            '',
            'secret_sauce'
        );

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText(
            'Epic sadface: Username is required'
        );

    });

});