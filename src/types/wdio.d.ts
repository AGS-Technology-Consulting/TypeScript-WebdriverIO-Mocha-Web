/// <reference types="@wdio/globals/types" />

declare global {
  const browser: WebdriverIO.Browser;
  const driver: WebdriverIO.Browser;
  const $: typeof import('@wdio/globals').$;
  const $$: typeof import('@wdio/globals').$$;
  const expect: typeof import('chai').expect;
  const assert: typeof import('chai').assert;
  
  namespace NodeJS {
    interface Global {
      expect: typeof import('chai').expect;
      assert: typeof import('chai').assert;
      should: typeof import('chai').should;
    }
  }
}

export {};
