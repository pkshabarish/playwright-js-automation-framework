const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.firstName = page.getByPlaceholder('First Name');

        this.lastName = page.getByPlaceholder('Last Name');

        this.postalCode = page.getByPlaceholder('Zip/Postal Code');

        this.continueButton = page.getByRole(
            'button',
            { name: 'Continue' }
        );

        this.finishButton = page.getByRole(
            'button',
            { name: 'Finish' }
        );

        this.successMessage = page.locator('.complete-header');
    }


    async enterCustomerInformation(firstName, lastName, postalCode) {

        await this.firstName.fill(firstName);

        await this.lastName.fill(lastName);

        await this.postalCode.fill(postalCode);

        await this.continueButton.click();
    }


    async finishOrder() {

        await this.finishButton.click();
    }


    async verifyOrderSuccess() {

        await expect(this.successMessage)
            .toHaveText('Thank you for your order!');
    }
}

module.exports = { CheckoutPage };