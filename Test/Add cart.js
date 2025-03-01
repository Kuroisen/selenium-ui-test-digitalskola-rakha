const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../Pages/loginPage")
const InventoryPage = require("../Pages/InventoryPage")
const data = require("../Fixture/testData.json")
const fs = require("fs");
const path = require("path");
const { compareScreenshots } = require("../Helper/visualTesting")

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
        const screenshotDir = path.join(__dirname,"../screenshots")
                if (!fs.existsSync(screenshotDir)){
                    fs.mkdirSync(screenshotDir)
                }

                const testCaseName = this.currentTest.title.replace(/\s+/g,"@")
                const newImagePath = path.join(screenshotDir, `${testCaseName}_new.png`)
                const baselinePath = path.join(screenshotDir,`${testCaseName}_baseline.png`)

                const image = await driver.takeScreenshot();
                fs.writeFileSync(newImagePath,image,"base64")

                if(!fs.existsSync(baselinePath)){
                    fs.copyFileSync(newImagePath, baselinePath)
                }

                await compareScreenshots(testCaseName)
                await driver.quit();
    });
});
