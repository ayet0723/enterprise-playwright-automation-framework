import { test as setup, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";

const authFile = "src/config/auth.json";

setup("authenticate and save session", async ({ page }) => {
  logger.info("Starting authentication setup to save browser session");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  const decryptedUserId = decrypt(process.env.userid!);
  const decryptedPassword = decrypt(process.env.password!);

  await loginPage.fillUsername(decryptedUserId);
  await loginPage.fillPassword(decryptedPassword);

  const homePage = await loginPage.clickLoginButton();

  // Complete MFA manually if needed, then wait for home page
  await homePage.expectServiceTitleToBeVisible();

  // Save authenticated state including cookies and session storage
  await page.context().storageState({ path: authFile });

  logger.info(
    "Browser session saved to auth.json - MFA won't be required for subsequent tests"
  );
});
