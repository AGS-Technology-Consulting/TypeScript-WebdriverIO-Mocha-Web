import { BasePage } from './BasePage';

class LoginPage extends BasePage {
  // Selectors for SauceDemo
  get usernameInput() { return $('#user-name'); }
  get passwordInput() { return $('#password'); }
  get loginButton() { return $('#login-button'); }
  get errorMessage() { return $('[data-test="error"]'); }
  get errorButton() { return $('.error-button'); }

  /**
   * Open login page
   */
  async openLoginPage(): Promise<void> {
    await this.open('/');
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.setValue(username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.setValue(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform login
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    try {
      return await this.errorMessage.getText();
    } catch (error) {
      return '';
    }
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    try {
      return await this.errorMessage.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    try {
      return await this.loginButton.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}

export default new LoginPage();
