import { browser } from '@wdio/globals';

export class BasePage {
  /**
   * Open a URL
   */
  async open(path: string): Promise<void> {
    await browser.url(path);
  }

  /**
   * Wait for element to be displayed
   */
  async waitForDisplayed(element: WebdriverIO.Element, timeout: number = 30000): Promise<void> {
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Wait for element to be clickable
   */
  async waitForClickable(element: WebdriverIO.Element, timeout: number = 30000): Promise<void> {
    await element.waitForClickable({ timeout });
  }

  /**
   * Click on element
   */
  async click(element: WebdriverIO.Element): Promise<void> {
    await this.waitForClickable(element);
    await element.click();
  }

  /**
   * Set value in element
   */
  async setValue(element: WebdriverIO.Element, value: string): Promise<void> {
    await this.waitForDisplayed(element);
    await element.clearValue();
    await element.setValue(value);
  }

  /**
   * Get text from element
   */
  async getText(element: WebdriverIO.Element): Promise<string> {
    await this.waitForDisplayed(element);
    return await element.getText();
  }

  /**
   * Check if element is displayed
   */
  async isDisplayed(element: WebdriverIO.Element): Promise<boolean> {
    try {
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return await browser.getUrl();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await browser.getTitle();
  }

  /**
   * Refresh page
   */
  async refresh(): Promise<void> {
    await browser.refresh();
  }

  /**
   * Navigate back
   */
  async back(): Promise<void> {
    await browser.back();
  }

  /**
   * Navigate forward
   */
  async forward(): Promise<void> {
    await browser.forward();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(filename: string): Promise<void> {
    const screenshot = await browser.takeScreenshot();
    const fs = require('fs');
    const path = require('path');
    const screenshotPath = path.join(__dirname, `../../screenshots/${filename}.png`);
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
  }

  /**
   * Wait for specific time
   */
  async pause(milliseconds: number): Promise<void> {
    await browser.pause(milliseconds);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(element: WebdriverIO.Element): Promise<void> {
    await element.scrollIntoView();
  }

  /**
   * Switch to iframe
   */
  async switchToFrame(frameElement: WebdriverIO.Element): Promise<void> {
    await browser.switchToFrame(frameElement);
  }

  /**
   * Switch to default content
   */
  async switchToDefaultContent(): Promise<void> {
    await browser.switchToParentFrame();
  }

  /**
   * Accept alert
   */
  async acceptAlert(): Promise<void> {
    await browser.acceptAlert();
  }

  /**
   * Dismiss alert
   */
  async dismissAlert(): Promise<void> {
    await browser.dismissAlert();
  }

  /**
   * Get alert text
   */
  async getAlertText(): Promise<string> {
    return await browser.getAlertText();
  }

  /**
   * Execute JavaScript
   */
  async executeScript(script: string, ...args: any[]): Promise<any> {
    return await browser.execute(script, ...args);
  }
}
