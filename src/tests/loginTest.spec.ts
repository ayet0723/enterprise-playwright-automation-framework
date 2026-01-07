import { expect, test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";

const authFile = "src/config/auth.json";

test("simple login test with self heal", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername_selfheal("demo_selfheal");
});

test("simple login test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();

  const decryptedUserId = decrypt(process.env.userid!);
  const decryptedPassword = decrypt(process.env.password!);

  console.log("SALT:", process.env.SALT);
  console.log("Encrypted userid:", process.env.userid);
  console.log("Decrypted userid:", decryptedUserId);
  console.log("Decrypted password:", decryptedPassword);

  await loginPage.fillUsername(decryptedUserId);
  await loginPage.fillPassword(decryptedPassword);
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
});

test.skip("Login with auth file", async ({ browser }) => {
  const context = await browser.newContext({ storageState: authFile });
  const page = await context.newPage();
  await page.goto(
    "https://mukunthanr2-dev-ed.lightning.force.com/lightning/page/home"
  );
  await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
});
