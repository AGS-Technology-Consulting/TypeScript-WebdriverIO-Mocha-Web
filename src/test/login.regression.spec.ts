import { expect } from 'chai';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import Logger from '../support/Logger';
import TestData from '../support/TestData';

describe('Login Tests - Regression', () => {
  before(async () => {
    Logger.suite('Login Regression Tests', 'STARTED');
  });

  beforeEach(async () => {
    await LoginPage.openLoginPage();
  });

  describe.skip('Valid Login Scenarios', () => {
    it('should login with standard user and display products page', async () => {
      const user = TestData.getStandardUser();
      await LoginPage.login(user.username, user.password);
      
      const isInventoryDisplayed = await InventoryPage.isInventoryPageDisplayed();
      expect(isInventoryDisplayed).to.be.true;
      
      const pageTitle = await InventoryPage.getPageTitle();
      expect(pageTitle).to.equal('Products');
    });

    it('should login with problem user', async () => {
      const user = TestData.getProblemUser();
      await LoginPage.login(user.username, user.password);
      
      const isInventoryDisplayed = await InventoryPage.isInventoryPageDisplayed();
      expect(isInventoryDisplayed).to.be.true;
    });

    it('should login with performance glitch user', async () => {
      const user = TestData.getPerformanceUser();
      await LoginPage.login(user.username, user.password);
      
      await browser.pause(2000); // Performance user has delay
      
      const isInventoryDisplayed = await InventoryPage.isInventoryPageDisplayed();
      expect(isInventoryDisplayed).to.be.true;
    });
  });

  describe('Invalid Login Scenarios', () => {
    it('should show error for invalid username', async () => {
      await LoginPage.login('invalid_user', 'secret_sauce');
      
      const isErrorDisplayed = await LoginPage.isErrorDisplayed();
      expect(isErrorDisplayed).to.be.true;
      
      const isStillOnLoginPage = await LoginPage.isLoginPageDisplayed();
      expect(isStillOnLoginPage).to.be.true;
    });

    it('should show error for invalid password', async () => {
      await LoginPage.login('standard_user', 'wrong_password');
      
      const isErrorDisplayed = await LoginPage.isErrorDisplayed();
      expect(isErrorDisplayed).to.be.true;
    });

    it('should show error for locked out user', async () => {
      const lockedUser = TestData.getLockedOutUser();
      await LoginPage.login(lockedUser.username, lockedUser.password);
      
      const errorMessage = await LoginPage.getErrorMessage();
      expect(errorMessage.toLowerCase()).to.include('locked out');
    });
  });

  describe('UI Validation Tests', () => {
    it('should display login button on page load', async () => {
      const isLoginPageDisplayed = await LoginPage.isLoginPageDisplayed();
      expect(isLoginPageDisplayed).to.be.true;
    });

    it('should have username input field', async () => {
      const isUsernameDisplayed = await LoginPage.usernameInput.isDisplayed();
      expect(isUsernameDisplayed).to.be.true;
    });

    it('should have password input field', async () => {
      const isPasswordDisplayed = await LoginPage.passwordInput.isDisplayed();
      expect(isPasswordDisplayed).to.be.true;
    });

    it('should show error for empty username and password', async () => {
      await LoginPage.login('', '');
      
      const isErrorDisplayed = await LoginPage.isErrorDisplayed();
      expect(isErrorDisplayed).to.be.true;
    });
  });

  describe('Login Flow Tests', () => {
    it('should clear input fields after failed login', async () => {
      await LoginPage.login('invalid', 'invalid');
      await browser.pause(1000);
      
      await LoginPage.usernameInput.clearValue();
      await LoginPage.passwordInput.clearValue();
      
      const user = TestData.getStandardUser();
      await LoginPage.login(user.username, user.password);
      
      const isInventoryDisplayed = await InventoryPage.isInventoryPageDisplayed();
      expect(isInventoryDisplayed).to.be.true;
    });
  });

  after(async () => {
    Logger.suite('Login Regression Tests', 'COMPLETED');
  });
});