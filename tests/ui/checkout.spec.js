const { test } = require('@playwright/test');

const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');

const testData = require('../../data/testData.json');


test('User should complete an order successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);


    await test.step('Login with valid credentials', async () => {

        await loginPage.navigate();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await inventoryPage.verifyInventoryPage();

    });


    await test.step('Add product to shopping cart', async () => {

        await inventoryPage.addProductToCart(
            testData.products.backpack
        );

    });


    await test.step('Verify product in cart', async () => {

        await inventoryPage.openCart();

        await cartPage.verifyProductInCart(
            testData.products.backpack
        );

    });


    await test.step('Enter checkout information', async () => {

        await cartPage.proceedToCheckout();

        await checkoutPage.enterCustomerInformation(
            testData.customer.firstName,
            testData.customer.lastName,
            testData.customer.postalCode
        );

    });


    await test.step('Complete the order', async () => {

        await checkoutPage.finishOrder();

        await checkoutPage.verifyOrderSuccess();

    });

});