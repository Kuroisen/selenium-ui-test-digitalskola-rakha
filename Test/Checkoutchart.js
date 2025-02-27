const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../Pages/loginPage")
const InventoryPage = require("../Pages/InventoryPage")
const CheckoutUser = require("../Pages/checkOut")
const data = require("../Fixture/testData.json")

describe("Test Checkout cart SauceDemo", function () {
    before(async function () {
        driver = await new Builder()
        this.timeout(60000);
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
        login = new LoginPage(driver);
        inventory = new InventoryPage(driver);
        checkout = new CheckoutUser(driver)
        
        await login.open("https://www.saucedemo.com/") 
            });

            it("TC01 - Checkout Berhasil", async function () {
                await login.login(
                    data.validUser.username,
                    data.validUser.password
                );
                let titleText = await inventory.getTitleText()
            assert.strictEqual(titleText.includes(data.assertTitle), true, data.titleText);

            await inventory.addCart()
            let actualItem = 3 
            await inventory.verifyCart(actualItem)
            await checkout.information(data.userCheckOut.first,data.userCheckOut.last,data.userCheckOut.zip)
            });
            after(async function () {
                await driver.quit();
            });
});
