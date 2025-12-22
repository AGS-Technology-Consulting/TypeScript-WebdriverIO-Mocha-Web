import { browser } from '@wdio/globals';

export class WebHelpers {
  /**
   * Wait for page to load
   */
  static async waitForPageLoad(timeout: number = 30000): Promise<void> {
    await browser.waitUntil(
      async () => {
        const state = await browser.execute(() => document.readyState);
        return state === 'complete';
      },
      {
        timeout,
        timeoutMsg: 'Page did not load within timeout'
      }
    );
  }

  /**
   * Scroll to top of page
   */
  static async scrollToTop(): Promise<void> {
    await browser.execute(() => window.scrollTo(0, 0));
  }

  /**
   * Scroll to bottom of page
   */
  static async scrollToBottom(): Promise<void> {
    await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
  }

  /**
   * Get browser name
   */
  static async getBrowserName(): Promise<string> {
    const capabilities = await browser.capabilities;
    return capabilities.browserName || '';
  }

  /**
   * Get browser version
   */
  static async getBrowserVersion(): Promise<string> {
    const capabilities = await browser.capabilities;
    return capabilities.browserVersion || '';
  }

  /**
   * Maximize window
   */
  static async maximizeWindow(): Promise<void> {
    await browser.maximizeWindow();
  }

  /**
   * Set window size
   */
  static async setWindowSize(width: number, height: number): Promise<void> {
    await browser.setWindowSize(width, height);
  }

  /**
   * Get window size
   */
  static async getWindowSize(): Promise<{ width: number; height: number }> {
    return await browser.getWindowSize();
  }

  /**
   * Delete all cookies
   */
  static async deleteAllCookies(): Promise<void> {
    await browser.deleteAllCookies();
  }

  /**
   * Get cookie
   */
  static async getCookie(name: string): Promise<WebDriver.Cookie | undefined> {
    return await browser.getCookies([name]).then(cookies => cookies[0]);
  }

  /**
   * Set cookie
   */
  static async setCookie(cookie: WebDriver.Cookie): Promise<void> {
    await browser.setCookies(cookie);
  }

  /**
   * Take screenshot
   */
  static async takeScreenshot(filename: string): Promise<void> {
    const screenshot = await browser.takeScreenshot();
    const fs = require('fs');
    const path = require('path');
    const screenshotPath = path.join(__dirname, `../../screenshots/${filename}.png`);
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
  }

  /**
   * Get page source
   */
  static async getPageSource(): Promise<string> {
    return await browser.getPageSource();
  }

  /**
   * Execute JavaScript
   */
  static async executeScript(script: string, ...args: any[]): Promise<any> {
    return await browser.execute(script, ...args);
  }

  /**
   * Wait for element to be present
   */
  static async waitForElement(selector: string, timeout: number = 30000): Promise<WebdriverIO.Element> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  /**
   * Hover over element
   */
  static async hoverElement(element: WebdriverIO.Element): Promise<void> {
    await element.moveTo();
  }

  /**
   * Double click element
   */
  static async doubleClick(element: WebdriverIO.Element): Promise<void> {
    await element.doubleClick();
  }

  /**
   * Right click element
   */
  static async rightClick(element: WebdriverIO.Element): Promise<void> {
    await element.click({ button: 'right' });
  }

  /**
   * Select dropdown by visible text
   */
  static async selectByVisibleText(element: WebdriverIO.Element, text: string): Promise<void> {
    await element.selectByVisibleText(text);
  }

  /**
   * Select dropdown by value
   */
  static async selectByValue(element: WebdriverIO.Element, value: string): Promise<void> {
    await element.selectByAttribute('value', value);
  }

  /**
   * Select dropdown by index
   */
  static async selectByIndex(element: WebdriverIO.Element, index: number): Promise<void> {
    await element.selectByIndex(index);
  }

  /**
   * Check if checkbox is selected
   */
  static async isCheckboxSelected(element: WebdriverIO.Element): Promise<boolean> {
    return await element.isSelected();
  }

  /**
   * Switch to window by title
   */
  static async switchToWindowByTitle(title: string): Promise<void> {
    const handles = await browser.getWindowHandles();
    for (const handle of handles) {
      await browser.switchToWindow(handle);
      const currentTitle = await browser.getTitle();
      if (currentTitle === title) {
        return;
      }
    }
  }

  /**
   * Get number of open windows
   */
  static async getWindowCount(): Promise<number> {
    const handles = await browser.getWindowHandles();
    return handles.length;
  }
}

export default WebHelpers;
