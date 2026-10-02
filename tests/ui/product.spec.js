const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');


test.describe('Product functionality', () => {


    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

    });


    test('User should add product to cart', async ({ page }) => {

        const inventoryPage = new InventoryPage(page);

        const cartPage = new CartPage(page);


        await inventoryPage.verifyInventoryPage();


        await inventoryPage.addProductToCart(
            'Sauce Labs Backpack'
        );


        await expect(
            inventoryPage.cartBadge
        ).toHaveText('1');


        await inventoryPage.openCart();


        await cartPage.verifyProductInCart(
            'Sauce Labs Backpack'
        );

    });

});