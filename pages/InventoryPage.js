const { expect } = require('@playwright/test');

class InventoryPage {

    constructor(page) {

        this.page = page;

        this.pageTitle = page.locator('.title');

        this.inventoryItems = page.locator('.inventory_item');

        this.cartLink = page.locator('.shopping_cart_link');

        this.cartBadge = page.locator('.shopping_cart_badge');
    }


    async verifyInventoryPage() {

        await expect(this.page).toHaveURL(/inventory/);

        await expect(this.pageTitle).toHaveText('Products');
    }


    async addProductToCart(productName) {

        const product = this.inventoryItems.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();

        await product
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }


    async openCart() {

        await this.cartLink.click();
    }
}

module.exports = { InventoryPage };