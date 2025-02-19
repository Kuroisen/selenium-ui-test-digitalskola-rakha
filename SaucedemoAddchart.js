const {By} = require("selenium-webdriver")
const assert = require('assert')
const SauceDemoCheckout = require("./SaucedemoCheckout")

async function sauceDemoAddChart(driver) {
    try{
        await driver.sleep(2000)
        //Add items sauce labs bike light
        await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")).click()
        listitem = 1

        await driver.sleep(2000) 
        //Add items  sauce labs fleece jacket
        await driver.findElement(By.id("add-to-cart-sauce-labs-fleece-jacket")).click()
        listitem += 1
        
        await driver.sleep(2000) 
        //Add items  sauce labs backpack
        await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click()
        listitem += 1

        await driver.sleep(2000) 
        //Add items  sauce labs backpack
        //await driver.findElement(By.className("shopping_cart_link")).click()
        await driver.findElement(By.className("shopping_cart_link")).click()

        await SauceDemoCheckout(driver, listitem)
    } finally {

    }
}
//sauceDemoAddChart();
module.exports = sauceDemoAddChart;