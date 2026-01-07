import { test } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import cdata from "../testdata/datademo.json";
import { convertCsvFileToJsonFile } from "../utils/CsvtoJsonUtil";
import {
  exportToCsv,
  exportToJson,
  generateTestData,
} from "../utils/FakerDataUtil";
import { demoOutput } from "../utils/fakersample";
import HomePage from "../pages/HomePage";

for (const contact of cdata) {
  test(`Advance DD test for ${contact.firstName} `, async ({ page }) => {
    logger.info("Test for Contact Creation is started...");

    // Navigate to Salesforce home - already authenticated via saved session
    await page.goto("/lightning/page/home");

    const homePage = new HomePage(page);
    await homePage.expectServiceTitleToBeVisible();
    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(contact.firstName, contact.lastName);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(
      contact.firstName,
      contact.lastName
    );
    logger.info("Test for Contact Creation is completed");
  });
}

test("simple DD test", async ({ page }) => {
  logger.info("Test for Contact Creation is started...");
  const fname = "AZ";
  const lname = "GG";

  // Navigate to Salesforce home - already authenticated via saved session
  await page.goto("/lightning/page/home");

  const homePage = new HomePage(page);
  await homePage.expectServiceTitleToBeVisible();
  const contactsPage = await homePage.navigateToContactTab();
  await contactsPage.createNewContact(fname, lname);
  await contactsPage.expectContactLabelContainsFirstNameAndLastName(
    fname,
    lname
  );
  logger.info("Test for Contact Creation is completed");
});

test("csv to json", async () => {
  convertCsvFileToJsonFile("data.csv", "datademo.json");
});

test("demo faker", async () => {
  console.log(demoOutput);
});

test("Faker", async ({ page }) => {
  // Generate test data
  const testData = generateTestData(20);

  // Export data to JSON file
  exportToJson(testData, "testData_en.json");

  // Export data to CSV file
  exportToCsv(testData, "testData_en.csv");
});
