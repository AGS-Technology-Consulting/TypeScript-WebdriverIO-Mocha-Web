import { config as sharedConfig } from './wdio.shared.conf';

export const config = {
  ...sharedConfig,
  
  capabilities: [{
    browserName: 'MicrosoftEdge',
    'ms:edgeOptions': {
      args: process.env.HEADLESS === 'true' 
        ? ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1920,1080']
        : ['--start-maximized']
    },
    acceptInsecureCerts: true
  }]
};
