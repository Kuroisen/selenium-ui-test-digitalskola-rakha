const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../Pages/loginPage")
const InventoryPage = require("../Pages/InventoryPage")
const data = require("../Fixture/testData.json")
const fs = require("fs");
const path = require("path");
const { compareScreenshots } = require("../Helper/visualTesting")


describe("Test Login SauceDemo", function () {

    beforeEach(async function () {
        this.timeout(60000);
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
        login = new LoginPage(driver);
        inventory = new InventoryPage(driver);
        
        await login.open("https://www.saucedemo.com/")        
    });
    
        it("TC01 - Login Berhasil", async function () {
            await login.login(
                data.validUser.username,
                data.validUser.password
            );
            // Validasi dashboard

            let titleText = await inventory.getTitleText()
            assert.strictEqual(titleText.includes(data.assertTitle), true, data.titleText);

            console.log("Login Success")
            });
        it("TC02 - Login Gagal Password Salah", async function () {    
            await login.login(
                    data.validUser.username,
                    data.invalidUser.password
                );
                // Validasi dashboard
                await login.verifyLoginFailed(data.messages.expectedLoginError, data.messages.loginError)
            });
            afterEach(async function () {
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
                await driver.quit(); // Tutup browser sebelum pindah ke yang berikutnya
            });
});
