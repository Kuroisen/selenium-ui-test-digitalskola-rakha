const { By } = require("selenium-webdriver");
const assert = require("assert");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.appLogo = By.xpath("//div[@class='app_logo']");
    //Barang
    this.bikeLight = By.id("add-to-cart-sauce-labs-bike-light");
    this.fleeceJacket = By.id("add-to-cart-sauce-labs-fleece-jacket")
    this.backpack = By.id("add-to-cart-sauce-labs-backpack")
    //cart icon
    this.cart = By.className("shopping_cart_link")
    //list item in cart
    this.listItem = By.className("cart_item")
    this.next = By.id("checkout")
  }

  async getTitleText() {
    return await this.driver.findElement(this.appLogo).getText();
  }

  async addCart(){
    await this.driver.findElement(this.bikeLight).click();
    await this.driver.findElement(this.fleeceJacket).click();
    await this.driver.findElement(this.backpack).click();
    await this.driver.findElement(this.cart).click();
  }

  async verifyCart(actualItem){
    let itemCount = await this.driver.findElements(this.listItem)
    let count = itemCount.length
    assert.strictEqual(count, actualItem, `Jumlah cart item tidak sesuai, diharapkan : ${actualItem}, Tetapi ditemukan ${count}`)
    await this.driver.findElement(this.next).click();
  }
}

module.exports = InventoryPage;
