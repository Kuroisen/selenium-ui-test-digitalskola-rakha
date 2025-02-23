const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

const browsers = [
    { name: "chrome", options: new chrome.Options().addArguments("--headless", "--disable-gpu") },
    { name: "firefox", options: new firefox.Options().addArguments("--headless") },
    { name: "MicrosoftEdge", options: new edge.Options().addArguments("--headless") }
];

describe("Test Login SauceDemo", function () {
    this.timeout(30000);

    let driver;

    for (const browser of browsers) {
        describe(`Test Login di ${browser.name} (Headless)`, function () {
            beforeEach(async function () {
                driver = await new Builder()
                    .forBrowser(browser.name)
                    .setChromeOptions(browser.options)
                    .setFirefoxOptions(browser.options)
                    .setEdgeOptions(browser.options)
                    .build();
                
                await driver.get("https://www.saucedemo.com/");
            });

            it("TC01 - Login Berhasil", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver.findElement(By.id("password")).sendKeys("secret_sauce");
                await driver.findElement(By.name("login-button")).click();

                // Validasi dashboard
                let titleText = await driver.findElement(By.className("app_logo")).getText();
                assert.strictEqual(titleText.includes("Swag Labs"), true, "Title does not include 'Swag Labs'");

                console.log(`Berhasil login menggunakan ${browser.name} (Headless)`);
            });

            it("TC02 - Login Gagal Password Salah", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver.findElement(By.id("password")).sendKeys("secret_sauceaaaa"); // Password salah
                await driver.findElement(By.name("login-button")).click();
                
                //validasi error massage
                let errorText = await driver.findElement(By.className("error-message-container")).getText();
                assert.strictEqual(
                    errorText.includes("Epic sadface: Username and password do not match any user in this service"),
                    true,
                    "Error message is incorrect"
                );

                console.log(`Gagal login dengan password salah menggunakan ${browser.name} (Headless)`);
            });

            it("TC03 - Login Gagal username Salah", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver.findElement(By.id("password")).sendKeys("secret_sauceaaaa"); // Password salah
                await driver.findElement(By.name("login-button")).click();

                 //validasi error massage
                let errorText = await driver.findElement(By.className("error-message-container")).getText();
                assert.strictEqual(
                    errorText.includes("Epic sadface: Username and password do not match any user in this service"),
                    true,
                    "Error message is incorrect"
                );

                console.log(`Gagal login dengan username dan username salah menggunakan ${browser.name} (Headless)`);
            });
            it("TC04 - Login Gagal username dan password Salah", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_useraaaaa");
                await driver.findElement(By.id("password")).sendKeys("secret_sauceaaaa"); // Password salah
                await driver.findElement(By.name("login-button")).click();

                 //validasi error massage
                let errorText = await driver.findElement(By.className("error-message-container")).getText();
                assert.strictEqual(
                    errorText.includes("Epic sadface: Username and password do not match any user in this service"),
                    true,
                    "Error message is incorrect"
                );

                console.log(`Gagal login dengan username salah menggunakan ${browser.name} (Headless)`);
            });
            it("TC05 - Login Gagal username Kosong", async function () {
                await driver.findElement(By.id("user-name")).sendKeys();
                await driver.findElement(By.id("password")).sendKeys("secret_sauceaaaa"); // Password salah
                await driver.findElement(By.name("login-button")).click();

                 //validasi error massage
                let errorText = await driver.findElement(By.className("error-message-container")).getText();
                assert.strictEqual(
                    errorText.includes("Epic sadface: Username is required"),
                    true,
                    "Error message is incorrect"
                );

                console.log(`Gagal login dengan username Kosong menggunakan ${browser.name} (Headless)`);
            });
            it("TC06 - Login Gagal password Kosong", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver.findElement(By.id("password")).sendKeys(); // Password salah
                await driver.findElement(By.name("login-button")).click();

                 //validasi error massage
                let errorText = await driver.findElement(By.className("error-message-container")).getText();
                assert.strictEqual(
                    errorText.includes("Epic sadface: Password is required"),
                    true,
                    "Error message is incorrect"
                );

                console.log(`Gagal login dengan Password kosong menggunakan ${browser.name} (Headless)`);
            });
            it("TC07 - Login Gagal password dan username Kosong", async function () {
                await driver.findElement(By.id("user-name")).sendKeys();
                await driver.findElement(By.id("password")).sendKeys(); // Password salah
                await driver.findElement(By.name("login-button")).click();

                 //validasi error massage
                let errorText = await driver.findElement(By.className("error-message-container")).getText();
                assert.strictEqual(
                    errorText.includes("Epic sadface: Username is required"),
                    true,
                    "Error message is incorrect"
                );

                console.log(`Gagal login dengan username dan password kosong menggunakan ${browser.name} (Headless)`);
            });
            afterEach(async function () {
                await driver.quit(); // Tutup browser sebelum pindah ke yang berikutnya
            });
        });
    };
});
