import { OnlineStorePage } from './app.po';
import {browser, by, element, protractor} from 'protractor';
const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  const args = arguments;
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });
  return origFn.apply(browser.driver.controlFlow(), args);
};
describe('online-store App', () => {
  let page: OnlineStorePage;

  beforeEach(() => {
    page = new OnlineStorePage();
  });

  it('should display 6 products.', () => {
    page.navigateTo();
    const products = element.all(by.css('.image-container'));
    expect(products.count()).toEqual(6);
  });
  it('should display cart popup.', () => {
    page.navigateTo();
    const cartMenu = element(by.css('.header-cart'));
    const cartPopup = element(by.tagName('cart-popup'));
    cartMenu.click();
    expect(cartPopup.isDisplayed());
  });
  it('should be able to add product to cart from image hover button.', () => {
    page.navigateTo();
    const cartButton = element.all(by.cssContainingText('.button', 'Add To Cart')).first();
    const cartMenu = element(by.css('.header-cart'));
    cartButton.click();
    cartMenu.click();
    const cartPopup = element.all(by.css('.pop-cart-item'));
    expect(cartPopup.count()).toEqual(1);
  });
  it('should be able to navigate to product page from image hover button.', () => {
    page.navigateTo();
    const productButton = element.all(by.cssContainingText('.button', 'View Details')).first();
    productButton.click();
  });
  it('should be able to remove product from cart popup.', () => {
    page.navigateTo();
    const cartButton = element.all(by.cssContainingText('.button', 'Add To Cart')).first();
    const cartMenu = element(by.css('.header-cart'));
    cartButton.click();
    cartMenu.click();
    const removeButton = element.all(by.css('.cart-remove'));
    removeButton.click();
    const cartPopup = element.all(by.css('.pop-cart-item'));
    expect(cartPopup.count()).toEqual(0);
  });
  it('should be able to navigate to cart page from cart popup.', () => {
    page.navigateTo();
    const cartButton = element.all(by.cssContainingText('.button', 'Add To Cart')).first();
    const cartMenu = element(by.css('.header-cart'));
    cartButton.click();
    cartMenu.click();
    const goCartButton = element.all(by.cssContainingText('.button', 'View Cart')).first();
    goCartButton.click();
  });
  it('should be able to add product to cart from product page.', () => {
    page.navigateToProduct();
    const cartButton = element(by.cssContainingText('.product-cart-button', 'Add to cart'));
    cartButton.click();
    const cartMenu = element(by.css('.header-cart'));
    cartMenu.click();
    const cartPopup = element.all(by.css('.pop-cart-item'));
    expect(cartPopup.count()).toEqual(1);
  });
  it('should be able to remove product from cart page.', () => {
    page.navigateToProduct();
    element(by.cssContainingText('.product-cart-button', 'Add to cart')).click();
    page.navigateToCart();
    const removeButton = element.all(by.css('.item-remove'));
    removeButton.click();
    const cartText = element(by.css('.cart-page-content h4'));
    expect(cartText.getText()).toEqual('Your cart is empty.');
  });
});
