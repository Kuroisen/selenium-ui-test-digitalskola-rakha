const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../Pages/loginPage")
const InventoryPage = require("../Pages/InventoryPage")
const data = require("../Fixture/testData.json")

describe("Test Add cart SauceDemo", function () {
    before(async function () {
        driver = await new Builder()
        this.timeout(60000);
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
        login = new LoginPage(driver);
        inventory = new InventoryPage(driver);
                
        await login.open("https://www.saucedemo.com/") 
    });
    
    it("TC01 - Add 1 Barang ke cart", async function () {
        await login.login(
            data.validUser.username,
            data.validUser.password
        );
        // Validasi dashboard

        let titleText = await inventory.getTitleText()
        assert.strictEqual(titleText.includes(data.assertTitle), true, data.titleText);
        
        await inventory.addCart()
        let actualItem = 3 
        await inventory.verifyCart(actualItem)
        //await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")).click();
    });
    
    after(async function () {
        await driver.quit(); 
    });
});
