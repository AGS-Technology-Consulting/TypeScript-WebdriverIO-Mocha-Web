import { expect } from 'chai';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import Logger from '../../support/Logger';
import TestData from '../../support/TestData';

describe('Login Tests - Smoke', () => {
  before(async () => {
    Logger.suite('Login Smoke Tests', 'STARTED');
  });

  beforeEach(async () => {
    Logger.info('Navigating to login page');
    await LoginPage.openLoginPage();
  });

  it('should successfully login with valid credentials', async () => {
    Logger.test('Valid login test', 'STARTED');
    
    const user = TestData.getStandardUser();
    await LoginPage.login(user.username, user.password);
    
    const isInventoryDisplayed = await InventoryPage.isInventoryPageDisplayed();
    expect(isInventoryDisplayed).to.be.true;
    
    const pageTitle = await InventoryPage.getPageTitle();
    expect(pageTitle).to.equal('Products');
    
    Logger.test('Valid login test', 'PASSED');
  });

  it('should display error for invalid credentials', async () => {
    Logger.test('Invalid credentials test', 'STARTED');
    
    const invalidCreds = TestData.getInvalidCredentials();
    await LoginPage.login(invalidCreds.username, invalidCreds.password);
    
    const isErrorDisplayed = await LoginPage.isErrorDisplayed();
    expect(isErrorDisplayed).to.be.true;
    
    Logger.test('Invalid credentials test', 'PASSED');
  });

  it('should display error for locked out user', async () => {
    Logger.test('Locked out user test', 'STARTED');
    
    const lockedUser = TestData.getLockedOutUser();
    await LoginPage.login(lockedUser.username, lockedUser.password);
    
    const errorMessage = await LoginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).to.include('locked out');
    
    Logger.test('Locked out user test', 'PASSED');
  });

  it('should display error for empty username', async () => {
    Logger.test('Empty username test', 'STARTED');
    
    await LoginPage.login('', 'secret_sauce');
    
    const errorMessage = await LoginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).to.include('username is required');
    
    Logger.test('Empty username test', 'PASSED');
  });

  it('should display error for empty password', async () => {
    Logger.test('Empty password test', 'STARTED');
    
    await LoginPage.login('standard_user', '');
    
    const errorMessage = await LoginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).to.include('password is required');
    
    Logger.test('Empty password test', 'PASSED');
  });

  after(async () => {
    Logger.suite('Login Smoke Tests', 'COMPLETED');
  });
});
