const {Builder, by, Key, until, By} = require("selenium-webdriver")
const assert = require('assert')
const sauceDemoAddChart = require("./SaucedemoAddchart")

async function sauceDemoLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try{
        //login
        await driver.get("https://www.saucedemo.com/")
        await driver.findElement(By.id("user-name")).sendKeys("standard_user")
        await driver.sleep(1000)
        await driver
            .findElement(By.xpath("//input[@id='password']"))
            .sendKeys("secret_sauce")
        await driver.sleep(2000)
        await driver.findElement(By.name("login-button")).click()

        //validate tittle is true
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText()
        assert.strictEqual(titleText.includes("Swag Labs"),true,'Tittle does not include Swag Labs')

        //automation add chart
        await sauceDemoAddChart(driver)
    }finally{
    }
}
sauceDemoLogin()
//module.exports = sauceDemoLogin;