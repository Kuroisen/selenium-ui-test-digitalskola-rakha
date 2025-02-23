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

describe("Test Checkout cart SauceDemo", function () {
    this.timeout(60000);

    for (const browser of browsers) { 
        describe(`Test Checkout di ${browser.name}(Headless)`, function () {
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

            it("TC01 - Checkout Berhasil", async function () {
                await driver.findElement(By.id("user-name")).sendKeys("standard_user");
                await driver.findElement(By.id("password")).sendKeys("secret_sauce");
                await driver.findElement(By.name("login-button")).click();

                //add barang
                await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")).click()
                await driver.sleep(2000);
                listitem = 1
                //add barang
                await driver.findElement(By.id("add-to-cart-sauce-labs-fleece-jacket")).click()
                await driver.sleep(2000);
                listitem += 1
                //add barang
                await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click()
                await driver.sleep(2000);
                listitem += 1
                console.log(`Menambahkan produk ke keranjang di ${browser.name}`);
                
                await driver.findElement(By.className("shopping_cart_link")).click()
                await driver.sleep(2000);

                let cartItems = await driver.findElements(By.className("cart_item"));
                let itemCount = cartItems.length;
                console.log(`Jumlah item dalam cart: ${itemCount}`);
                assert.strictEqual(itemCount, listitem, `Jumlah cart item tidak sesuai. Diharapkan: ${listitem}, tetapi ditemukan: ${itemCount}`);
                await driver.sleep(2000);

                await driver.findElement(By.id("checkout")).click()
                await driver.sleep(2000);

                await driver.sleep(1000)
                await driver.findElement(By.id("first-name")).sendKeys("Rakha")
                await driver.sleep(1000)
                await driver.findElement(By.id("last-name")).sendKeys("Hilmy")
                await driver.sleep(1000)
                await driver.findElement(By.id("postal-code")).sendKeys("887211")
                await driver.sleep(1000)
                await driver.findElement(By.name("continue")).click()
                await driver.sleep(1000)

                let Checkoutitem = await driver.findElements(By.className("cart_item"));
                let Checkoutitems = Checkoutitem.length;
                console.log(`Jumlah item dalam Checkout: ${Checkoutitems}`);
                assert.strictEqual(Checkoutitems, listitem, `Jumlah cart item tidak sesuai. Diharapkan: ${listitem}, tetapi ditemukan: ${Checkoutitems}`);

                await driver.sleep(1000)
                await driver.findElement(By.name("finish")).click()
                await driver.sleep(1000)
            });
            after(async function () {
                await driver.quit();
            });
        });
    }
});
