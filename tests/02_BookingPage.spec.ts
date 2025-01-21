import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://automationintesting.online/');
});


test('Ensure today is the preselected date on the calendar', async ({ page }) => {

  //click book this room button of first room available
  await page.getByRole('button', { name: 'Book this room' }).first().click();

  // Find out which day of the month it is and assign to const
  const dayOfMonth: number = new Date().getDate();
  const element = page.locator('#root > div > div > div:nth-child(4) > div > div:nth-child(2) > div.col-sm-6 > div > div.rbc-month-view > div:nth-child(5) > div.rbc-row-content > div > div.rbc-date-cell.rbc-now.rbc-current > button');
  const elementText = await element.textContent();
  console.log(elementText);

  //compare date of selected day to todays date
  expect(elementText).toBe('' + dayOfMonth + '');

});


test('Verify room booking functionality', async ({ page }) => {
  // Navigate to the target page
  await page.getByRole('button', { name: 'Book this room' }).first().click();

  // Wait for the calendar to load (adjust the selector as needed)
  await page.waitForSelector('.rbc-calendar'); // The calendar view should be loaded

  // Locate the reference date cell for today's date
  const referenceElement = page.locator('.rbc-date-cell.rbc-now'); // Today's date in the calendar
  await expect(referenceElement).toBeVisible();

  // Locate the button inside today's date cell (if applicable)
  const refElementChild = referenceElement.locator('button'); // Locate button inside today's date cell (adjust if needed)
  const refElementChildText = await refElementChild.textContent();
  console.log(`Reference element text: ${refElementChildText}`);

  // Locate the sibling date cell (e.g., the next date)
  const siblingElement = referenceElement.locator('xpath=following-sibling::*[1]');
  await expect(siblingElement).toBeVisible();

  // Retrieve text content from the sibling date (optional)
  const siblingChild = siblingElement.locator('xpath=./*[1]'); // Adjust to select the correct child
  const siblingElementChildText = await siblingChild.textContent();
  console.log(`Sibling element text: ${siblingElementChildText}`);

  // Perform drag-and-drop from today's date to the next date
  await referenceElement.dragTo(siblingElement);

  // Fill in booking details
  await page.getByPlaceholder('Firstname').click();
  await page.getByPlaceholder('Firstname').fill('shaun');
  await page.getByPlaceholder('Firstname').press('Tab');
  await page.getByPlaceholder('Lastname').fill('test');
  await page.getByPlaceholder('Lastname').press('Tab');
  await page.locator('input[name="email"]').fill('shaun@test.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="phone"]').fill('934394049484');
  await page.getByRole('button', { name: 'Book', exact: true }).click();

  // Validate booking confirmation
  await expect(page.locator('text="Booking Successful!"')).toBeVisible();
});

test('Ensure that Booking page meets the WCAG 2.0 AA accessibilty standards', async ({ page }, testInfo) => {

  // Click on the book this room button for the first room available
  await page.getByRole('button', { name: 'Book this room' }).first().click();

  //checks entire page
  const axeBuilder = await new AxeBuilder({ page })
    .withTags(["wcag2aa"])
    .analyze();

  await testInfo.attach("accessibilty-results-report-booking-page", {
    body: JSON.stringify(axeBuilder, null, 2),
    contentType: "application/json"
  });
  expect(axeBuilder.violations).toEqual([]);

});

