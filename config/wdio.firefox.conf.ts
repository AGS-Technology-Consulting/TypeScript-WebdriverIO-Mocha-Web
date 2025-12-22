import { config as sharedConfig } from './wdio.shared.conf';

export const config = {
  ...sharedConfig,
  
  capabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: process.env.HEADLESS === 'true' 
        ? ['-headless']
        : []
    },
    acceptInsecureCerts: true
  }]
};
