const {By} = require("selenium-webdriver")
const assert = require('assert')

async function SauceDemoCheckout(driver, listitem) {
    //validate text
    let titleText = await driver.findElement(By.className("title")).getText()
    assert.strictEqual(titleText.includes("Your Cart"),true,'Tittle does not include Your Cart')

    try{
        try {
            // Ambil semua elemen dengan class "cart_item"
            let cartItems = await driver.findElements(By.className("cart_item"));

            // Hitung jumlah elemen yang ditemukan
            let itemCount = cartItems.length;
            console.log(`Jumlah item dalam cart: ${itemCount}`);

            // Validasi apakah jumlahnya sesuai dengan yang diharapkan
            assert.strictEqual(itemCount, listitem, `Jumlah cart item tidak sesuai. Diharapkan: ${listitem}, tetapi ditemukan: ${itemCount}`);

            console.log("✅ Sukses: Jumlah cart item sesuai dengan yang diharapkan!");

        } catch (error) {
            console.error("❌ Gagal: Validasi jumlah cart item tidak sesuai. Error:", error.message);
        }
        
        await driver.sleep(1000)
        await driver.findElement(By.id("checkout")).click()

        await driver.sleep(1000)
        await driver.findElement(By.id("first-name")).sendKeys("Rakha")
        await driver.sleep(1000)
        await driver.findElement(By.id("last-name")).sendKeys("Hilmy")
        await driver.sleep(1000)
        await driver.findElement(By.id("postal-code")).sendKeys("887211")
        await driver.sleep(1000)
        await driver.findElement(By.name("continue")).click()
        try {
            // Ambil semua elemen dengan class "cart_item"
            let cartItems = await driver.findElements(By.className("cart_item"));

            // Hitung jumlah elemen yang ditemukan
            let itemCount = cartItems.length;
            console.log(`Jumlah item dalam cart: ${itemCount}`);

            // Validasi apakah jumlahnya sesuai dengan yang diharapkan
            assert.strictEqual(itemCount, listitem, `Jumlah cart item tidak sesuai. Diharapkan: ${listitem}, tetapi ditemukan: ${itemCount}`);

            console.log("✅ Sukses: Jumlah cart item sesuai dengan yang diharapkan!");

        } catch (error) {
            console.error("❌ Gagal: Validasi jumlah cart item tidak sesuai. Error:", error.message);
        }
        await driver.sleep(1000)
        await driver.findElement(By.name("finish")).click()
    }finally{

    }
}   

module.exports = SauceDemoCheckout