const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../Pages/loginPage")
const InventoryPage = require("../Pages/InventoryPage")
const data = require("../Fixture/testData.json")


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
                await driver.quit(); // Tutup browser sebelum pindah ke yang berikutnya
            });
});
