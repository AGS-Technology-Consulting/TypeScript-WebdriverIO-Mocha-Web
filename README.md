# WebdriverIO Mocha Web Automation Framework

A professional TypeScript-based web automation framework using WebdriverIO, Mocha (TDD/BDD), and multiple browser support.

## 📋 Features

- ✅ TypeScript for type safety
- ✅ Mocha test framework (TDD/BDD)
- ✅ WebdriverIO v9 for web automation
- ✅ Multi-browser support (Chrome, Firefox, Edge, Safari)
- ✅ Parallel execution
- ✅ Page Object Model (POM)
- ✅ Allure reporting with screenshots
- ✅ Winston logging
- ✅ Test data utilities
- ✅ Web-specific helpers
- ✅ Headless execution support
- ✅ CI/CD ready

## 🔧 Prerequisites

- Node.js (v18+)
- npm or yarn
- Chrome/Firefox/Edge/Safari browsers

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration
```

## 🚀 Running Tests

### Quick Start

```bash
# Run tests on Chrome
npm run test:chrome

# Run tests on Firefox
npm run test:firefox

# Run tests on Edge
npm run test:edge

# Run tests on Safari (macOS only)
npm run test:safari

# Run in headless mode
npm run test:headless

# Run smoke tests only
npm run test:smoke

# Run regression tests
npm run test:regression

# Run on multiple browsers in parallel
npm run test:parallel
```

### Advanced Usage

```bash
# Run specific test file
npx wdio run config/wdio.chrome.conf.ts --spec=src/test/login.regression.spec.ts

# Run tests matching pattern
npx wdio run config/wdio.chrome.conf.ts --spec=**/smoke/*.spec.ts

# Run with grep
npx wdio run config/wdio.chrome.conf.ts --mochaOpts.grep="login"

# Skip tests
npx wdio run config/wdio.chrome.conf.ts --mochaOpts.grep="skip" --mochaOpts.invert

# Custom timeout
npx wdio run config/wdio.chrome.conf.ts --mochaOpts.timeout=90000
```

## 📁 Project Structure

```
wdio-mocha-web-framework/
├── config/                          # WebdriverIO configurations
│   ├── wdio.shared.conf.ts         # Shared config
│   ├── wdio.chrome.conf.ts         # Chrome config
│   ├── wdio.firefox.conf.ts        # Firefox config
│   ├── wdio.edge.conf.ts           # Edge config
│   ├── wdio.safari.conf.ts         # Safari config
│   └── wdio.parallel.conf.ts       # Parallel config
├── src/
│   ├── test/                       # Test files
│   │   ├── smoke/                  # Smoke tests
│   │   │   └── login.smoke.spec.ts
│   │   └── login.regression.spec.ts
│   ├── pages/                      # Page Objects
│   │   ├── BasePage.ts             # Base page class
│   │   ├── LoginPage.ts            # Login page
│   │   └── InventoryPage.ts        # Inventory page
│   ├── support/                    # Utilities
│   │   ├── Logger.ts               # Winston logger
│   │   ├── TestData.ts             # Test data generator
│   │   └── WebHelpers.ts           # Web helpers
│   └── types/                      # TypeScript types
│       └── wdio.d.ts               # Global type definitions
├── reports/                        # Test reports
├── screenshots/                    # Screenshots
└── logs/                          # Execution logs
```

## 📝 Writing Tests

### Test File Structure

```typescript
import { expect } from 'chai';
import LoginPage from '../pages/LoginPage';

describe('Test Suite Name', () => {
  before(async () => {
    // Runs once before all tests
  });

  beforeEach(async () => {
    // Runs before each test
    await LoginPage.openLoginPage();
  });

  it('should perform action', async () => {
    await LoginPage.login('username', 'password');
    expect(await LoginPage.isLoginPageDisplayed()).to.be.true;
  });

  afterEach(async () => {
    // Runs after each test
  });

  after(async () => {
    // Runs once after all tests
  });
});
```

### Page Object Example

```typescript
import { BasePage } from './BasePage';

class MyPage extends BasePage {
  get element() { return $('#my-element'); }
  
  async doSomething(): Promise<void> {
    await this.element.click();
  }
}

export default new MyPage();
```

### Nested Suites

```typescript
describe('Login Tests', () => {
  describe('Valid Login Scenarios', () => {
    it('should login with valid user', async () => {
      // test code
    });
  });

  describe('Invalid Login Scenarios', () => {
    it('should show error for invalid user', async () => {
      // test code
    });
  });
});
```

## 🎯 Mocha Features

### Test Selection

```bash
# Run specific test
it('should login', async () => { });

# Skip test
it.skip('should skip this test', async () => { });

# Only run this test
it.only('should only run this', async () => { });

# Run tests matching grep
npx wdio --mochaOpts.grep="login"

# Exclude tests
npx wdio --mochaOpts.grep="@slow" --mochaOpts.invert
```

### Hooks

```typescript
before(() => { }); // Runs once before all tests
beforeEach(() => { }); // Runs before each test
afterEach(() => { }); // Runs after each test
after(() => { }); // Runs once after all tests
```

### Retries

```typescript
// In wdio.shared.conf.ts
mochaOpts: {
  retries: 1  // Retry failed tests once
}
```

## 📊 Reporting

### Generate Allure Report

```bash
npm run report
```

### Report Features

- Test execution history
- Screenshots on failure
- Test duration metrics
- Detailed step-by-step execution
- Trend analysis

## 🛠️ Configuration

### Environment Variables (.env)

```env
BASE_URL=https://www.saucedemo.com
HEADLESS=false
LOG_LEVEL=info
BROWSER=chrome
DEFAULT_TIMEOUT=30000
```

### Browser Options

Update browser-specific configs in `config/` folder:

```typescript
'goog:chromeOptions': {
  args: ['--start-maximized', '--disable-infobars']
}
```

### Timeouts

Update in `wdio.shared.conf.ts`:

```typescript
waitforTimeout: 30000,
connectionRetryTimeout: 120000,
mochaOpts: {
  timeout: 60000
}
```

## 🎯 Best Practices

1. **Use Page Objects** to separate test logic from page interactions
2. **Use describe blocks** to group related tests
3. **Use before/after hooks** for setup and teardown
4. **Keep tests independent** - each test should run standalone
5. **Use meaningful test names** - describe what the test does
6. **Use Logger** for debugging and tracing
7. **Handle waits properly** - use explicit waits instead of hard pauses
8. **Use TestData** for test data management
9. **Avoid hard-coded values** - use constants or test data
10. **Clean up after tests** - close browsers, delete test data

## 🔄 Mocha vs Cucumber

| Feature | Mocha | Cucumber |
|---------|-------|----------|
| **Syntax** | describe/it | Given/When/Then |
| **Files** | .spec.ts | .feature + step definitions |
| **Style** | TDD/BDD | Pure BDD |
| **Readability** | Developer-friendly | Business-friendly |
| **Flexibility** | High - direct code | Medium - step reuse |
| **Learning Curve** | Lower | Higher |
| **Setup** | Simpler | More complex |
| **Best For** | Technical teams | Business collaboration |

## 🔄 CI/CD Integration

### GitHub Actions

See `.github/workflows/web-tests.yml`

### Jenkins

See `Jenkinsfile`

## 🐛 Debugging

### Run with Debug Logging

```bash
LOG_LEVEL=debug npm run test:chrome
```

### Common Issues

**Browser not found:**
```bash
# Browsers are automatically managed by WebdriverIO v9
npm run test:chrome
```

**Timeout errors:**
- Increase timeout in `wdio.shared.conf.ts`
- Check network connectivity
- Verify element selectors

**Element not found:**
- Use Selenium IDE or browser DevTools to verify selectors
- Add proper waits before interactions
- Check if element is in iframe

## 📚 Resources

- [WebdriverIO Docs](https://webdriver.io/)
- [Mocha Docs](https://mochajs.org/)
- [Chai Assertions](https://www.chaijs.com/)
- [Allure Reports](https://docs.qameta.io/allure/)

## 👤 Author

**Pravin**
- Senior QA Automation Engineer
- 5+ years of experience in test automation

## 📄 License

MIT

---

**Happy Testing! 🚀**
