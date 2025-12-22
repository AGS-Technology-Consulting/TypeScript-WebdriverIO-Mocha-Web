import { config as sharedConfig } from './wdio.shared.conf';

export const config = {
  ...sharedConfig,
  
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: process.env.HEADLESS === 'true' 
        ? ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080']
        : ['--start-maximized', '--disable-infobars', '--disable-notifications']
    },
    acceptInsecureCerts: true
  }]
};
