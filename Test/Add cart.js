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

describe("Test Add cart SauceDemo", function () {
    this.timeout(60000);

    for (const browser of browsers) {
        describe(`Test Add cart di ${browser.name} (Headless)`, function () {
            let driver;

            before(async function () {
                driver = await new Builder()
                    .forBrowser(browser.name)
                    .setChromeOptions(browser.options)
                    .setFirefoxOptions(browser.options)
                    .setEdgeOptions(browser.options)
                    .build();
                
                await driver.get("https://www.saucedemo.com/");
            });

            it("TC01 - Add 1 Barang ke cart", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver.findElement(By.id("password")).sendKeys("secret_sauce");
                await driver.findElement(By.name("login-button")).click();

                let titleText = await driver.findElement(By.className("app_logo")).getText();
                assert.strictEqual(titleText.includes("Swag Labs"), true, "Title does not include 'Swag Labs'");

                console.log(`Berhasil login menggunakan ${browser.name}`);
                await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")).click();

                await driver.sleep(2000); // Delay 2 detik sebelum lanjut ke IT berikutnya
            });

            it("TC02 - Hapus Produk dari Keranjang", async function () {
                console.log(`Mengeluarkan produk dari keranjang di ${browser.name}`);
                await driver.findElement(By.id("remove-sauce-labs-bike-light")).click();

                await driver.sleep(2000);
            });
            it("TC03 - Add multi Produk ke Keranjang", async function () {
                await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")).click()
                await driver.sleep(2000);
                listitem = 1

                await driver.findElement(By.id("add-to-cart-sauce-labs-fleece-jacket")).click()
                await driver.sleep(2000);
                listitem += 1

                await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click()
                await driver.sleep(2000);
                listitem += 1
                console.log(`Menambahkan produk ke keranjang di ${browser.name}`);
                
                await driver.findElement(By.className("shopping_cart_link")).click()
                await driver.sleep(2000);

                let cartItems = await driver.findElements(By.className("cart_item"));
                let itemCount = cartItems.length;
                console.log(`Jumlah item dalam cart: ${itemCount}`);
                await driver.sleep(2000);

            });
            after(async function () {
                await driver.quit(); 
            });
        });
    }
});
