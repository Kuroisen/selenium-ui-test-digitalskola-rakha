const { By } = require("selenium-webdriver");
const assert = require("assert");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.firstName = By.id("first-name");
    this.lastName = By.id("last-name");
    this.zipCode = By.id("postal-code");
    this.continue = By.name("continue");
    this.checkoutItem = By.name("finish")
  }

  async information(first_name,last_name,Zip_Code){
    await this.driver.findElement(this.firstName).sendKeys(first_name);
    await this.driver.findElement(this.lastName).sendKeys(last_name);
    await this.driver.findElement(this.zipCode).sendKeys(Zip_Code);
    await this.driver.findElement(this.continue).click();
    await this.driver.findElement(this.checkoutItem).click();
  }
  async checkout(){
    await this.driver.findElement(this.checkoutItem).click();
  }
}

module.exports = InventoryPage;
