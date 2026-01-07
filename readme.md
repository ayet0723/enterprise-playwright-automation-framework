# Enterprise Playwright Automation Framework

A comprehensive enterprise-grade test automation framework built with Playwright and TypeScript, featuring encrypted credential management, session-based authentication, data-driven testing, and self-healing capabilities.

## 🚀 Features

- **Session-Based Authentication** - Login once, save session, avoid MFA on subsequent test runs
- **Encrypted Credentials** - Secure storage of sensitive data using AES encryption
- **Page Object Model** - Maintainable and reusable page objects
- **Data-Driven Testing** - Support for JSON and CSV test data
- **Self-Healing Locators** - Automatic fallback for element selection
- **Comprehensive Logging** - Winston-based logging for debugging
- **Faker Data Generation** - Generate realistic test data on-the-fly
- **GitHub Actions CI/CD** - Automated test execution on push/PR
- **ESLint Integration** - Code quality and consistency

## 📁 Project Structure

```
enterprise-playwright-automation-framework/
├── .github/
│   └── workflows/
│       └── main.yml          # GitHub Actions CI/CD pipeline
├── src/
│   ├── config/
│   │   ├── .env              # Environment variables (encrypted credentials)
│   │   ├── .env.qa           # QA environment config
│   │   ├── .env.uat          # UAT environment config
│   │   └── auth.json         # Saved browser session (auto-generated)
│   ├── fixtures/
│   │   └── loginFixture.ts   # Reusable login fixtures
│   ├── pages/
│   │   ├── LoginPage.ts      # Login page object
│   │   ├── HomePage.ts       # Home page object
│   │   ├── ContactPage.ts    # Contact page object
│   │   └── CasePage.ts       # Case page object
│   ├── testdata/
│   │   ├── contacts.json     # Test data for contacts
│   │   ├── datademo.json     # Sample test data
│   │   └── *.csv            # CSV test data files
│   ├── tests/
│   │   ├── auth.setup.ts     # Authentication setup (runs first)
│   │   ├── loginTest.spec.ts # Login test suite
│   │   ├── contactTest.spec.ts # Contact creation tests
│   │   └── *.spec.ts         # Other test suites
│   └── utils/
│       ├── CryptojsUtil.ts   # Encryption/decryption utilities
│       ├── LoggerUtil.ts     # Winston logger configuration
│       ├── FakerDataUtil.ts  # Test data generation
│       ├── CsvtoJsonUtil.ts  # CSV to JSON converter
│       └── SelfHealingUtil.ts # Self-healing locator logic
├── test-results/             # Test execution results
├── playwright-report/        # HTML test reports
├── playwright.config.ts      # Playwright configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── .gitignore               # Git ignore rules
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+ installed
- Git installed
- A Salesforce or target application account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/enterprise-playwright-automation-framework.git
   cd enterprise-playwright-automation-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables**
   
   Create `.env` file in `src/config/` with your encrypted credentials:
   ```
   SALT=mySecretSalt123
   userid=<encrypted_userid>
   password=<encrypted_password>
   ```

   To encrypt your credentials, run:
   ```bash
   node -e "const CryptoJS = require('crypto-js'); const SALT = 'mySecretSalt123'; const userid = 'your@email.com'; const password = 'yourPassword'; console.log('userid=' + CryptoJS.AES.encrypt(userid, SALT).toString()); console.log('password=' + CryptoJS.AES.encrypt(password, SALT).toString());"
   ```

## 🏃 Running Tests

### First Time Setup (with Authentication)
Run tests for the first time - you'll complete login + MFA once, then the session is saved:
```bash
npx playwright test contactTest.spec.ts
```

### Subsequent Test Runs (No MFA Needed)
All tests will use the saved session from `auth.json`:
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test loginTest.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in specific project
npx playwright test --project="Google Chrome"
```

### Refresh Authentication Session
If the session expires, refresh it by running:
```bash
npx playwright test auth.setup.ts --project=setup
```

### View Test Reports
```bash
npx playwright show-report
```

## 📝 Writing Tests

### Using Saved Session (Recommended)
```typescript
import { test } from "@playwright/test";
import HomePage from "../pages/HomePage";

test("my test with saved session", async ({ page }) => {
  // Already authenticated - just navigate
  await page.goto("/lightning/page/home");
  
  const homePage = new HomePage(page);
  // ... your test code
});
```

### Manual Login (if needed)
```typescript
import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil";

test("manual login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));
  await loginPage.clickLoginButton();
});
```

## 🔒 Security

- Credentials are encrypted using AES encryption
- `.env` files are excluded from Git
- `auth.json` session file is excluded from Git
- Never commit sensitive data

## 🧪 CI/CD

GitHub Actions workflow (`.github/workflows/main.yml`) automatically:
- Runs on push to `test` branch
- Installs dependencies and browsers
- Executes test suite
- Uploads test reports as artifacts

## 📊 Test Reports

After test execution:
- HTML Report: `playwright-report/index.html`
- Test Results: `test-results/`
- Videos: Available for failed tests
- Screenshots: Captured on failure
- Traces: Available for debugging

## 🛠️ Utilities

### Encryption/Decryption
```typescript
import { encrypt, decrypt } from "../utils/CryptojsUtil";
const encrypted = encrypt("sensitiveData");
const decrypted = decrypt(encrypted);
```

### Logger
```typescript
import logger from "../utils/LoggerUtil";
logger.info("Test started");
logger.error("Test failed");
```

### Faker Data Generation
```typescript
import { generateTestData, exportToJson } from "../utils/FakerDataUtil";
const testData = generateTestData(10);
exportToJson(testData, "output.json");
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Azima**

## 🙏 Acknowledgments

- Playwright Team for the excellent testing framework
- Community contributors
