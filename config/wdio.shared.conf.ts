import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const config = {
  runner: 'local',
  
  specs: [
    path.join(__dirname, '../src/test/**/*.spec.ts')
  ],
  
  exclude: [],
  
  maxInstances: 1,
  
  capabilities: [],
  
  logLevel: 'info',
  
  bail: 0,
  
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  
  waitforTimeout: 30000,
  
  connectionRetryTimeout: 120000,
  
  connectionRetryCount: 3,
  
  framework: 'mocha',
  
  reporters: [
    'spec',
    ['allure', {
      outputDir: path.join(__dirname, '../allure-results'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: 1
  },
  
  beforeSession: function () {
    console.log('Starting test session...');
  },
  
  before: function () {
    const chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
  
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      const screenshot = await browser.takeScreenshot();
      const screenshotPath = path.join(
        __dirname,
        '../screenshots',
        `FAILED_${test.title.replace(/\s+/g, '_')}_${Date.now()}.png`
      );
      require('fs').writeFileSync(screenshotPath, screenshot, 'base64');
    }
  },
  
  afterSession: function () {
    console.log('Test session completed.');
  }
};
