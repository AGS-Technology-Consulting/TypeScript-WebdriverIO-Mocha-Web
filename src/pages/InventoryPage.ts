import { BasePage } from './BasePage';

class InventoryPage extends BasePage {
  // Selectors for SauceDemo Inventory
  get pageTitle() { return $('.title'); }
  get shoppingCart() { return $('.shopping_cart_link'); }
  get shoppingCartBadge() { return $('.shopping_cart_badge'); }
  get hamburgerMenu() { return $('#react-burger-menu-btn'); }
  get logoutLink() { return $('#logout_sidebar_link'); }
  get inventoryList() { return $('.inventory_list'); }
  get inventoryItems() { return $$('.inventory_item'); }
  get addToCartButtons() { return $$('[data-test^="add-to-cart"]'); }
  get removeButtons() { return $$('[data-test^="remove"]'); }
  get sortDropdown() { return $('[data-test="product_sort_container"]'); }

  /**
   * Verify inventory page is displayed
   */
  async isInventoryPageDisplayed(): Promise<boolean> {
    try {
      return await this.inventoryList.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.getText();
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    try {
      const badgeText = await this.shoppingCartBadge.getText();
      return parseInt(badgeText);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Add item to cart by index
   */
  async addItemToCart(index: number): Promise<void> {
    const buttons = await this.addToCartButtons;
    await buttons[index].click();
  }

  /**
   * Add item to cart by name
   */
  async addItemToCartByName(productName: string): Promise<void> {
    const button = await $(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await button.click();
  }

  /**
   * Remove item from cart by index
   */
  async removeItemFromCart(index: number): Promise<void> {
    const buttons = await this.removeButtons;
    await buttons[index].click();
  }

  /**
   * Click shopping cart
   */
  async clickShoppingCart(): Promise<void> {
    await this.shoppingCart.click();
  }

  /**
   * Open hamburger menu
   */
  async openMenu(): Promise<void> {
    await this.hamburgerMenu.click();
    await browser.pause(500);
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    const items = await this.inventoryItems;
    return items.length;
  }

  /**
   * Sort products
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectByAttribute('value', option);
  }
}

export default new InventoryPage();
