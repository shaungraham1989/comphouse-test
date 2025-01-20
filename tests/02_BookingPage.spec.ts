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

    // Click on the book this room button for the first room available
    await page.getByRole('button', { name: 'Book this room' }).first().click();
  
    // Select a date and check availability
    const room = await page.locator('.rbc-date-cell.rbc-now.rbc-current');
    await room.click();
  
    // Fill in booking details
    await page.getByPlaceholder('Firstname').click();
    await page.getByPlaceholder('Firstname').fill('shaun');
    await page.getByPlaceholder('Firstname').press('Tab');
    await page.getByPlaceholder('Lastname').fill('graham');
    await page.getByPlaceholder('Lastname').press('Tab');
    await page.locator('input[name="email"]').fill('shaun@test.com');
    await page.locator('input[name="email"]').press('Tab');
    await page.locator('input[name="phone"]').fill('934394049484');
    await page.getByRole('button', { name: 'Book', exact: true }).click();
  
    // Validate booking confirmation
    await expect(page.locator('text="Booking Confirmed"')).toBeVisible();

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
    expect (axeBuilder.violations).toEqual([]);
  
  });