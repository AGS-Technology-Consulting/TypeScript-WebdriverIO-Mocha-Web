import { config as sharedConfig } from './wdio.shared.conf';

export const config = {
  ...sharedConfig,
  
  maxInstances: 3,
  
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--start-maximized', '--disable-infobars']
      }
    },
    {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: []
      }
    },
    {
      browserName: 'MicrosoftEdge',
      'ms:edgeOptions': {
        args: ['--start-maximized']
      }
    }
  ]
};
