const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Negative Login Tests', () => {

    test('should display error for locked-out user', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            'locked_out_user',
            'secret_sauce'
        );

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText(
            'Epic sadface: Sorry, this user has been locked out.'
        );

    });

});