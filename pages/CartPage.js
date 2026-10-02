const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {

        this.page = page;

        this.cartItems = page.locator('.cart_item');

        this.checkoutButton = page.getByRole(
            'button',
            { name: 'Checkout' }
        );
    }


    async verifyProductInCart(productName) {

        const product = this.cartItems.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();
    }


    async proceedToCheckout() {

        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };