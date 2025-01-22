import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/ShadyMeadowsBookingPage';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  // Initialize the BookingPage object before each test
  const bookingPage = new BookingPage(page);
  console.log(`Running ${test.info().title}`);
  await bookingPage.navigateToHomePage();  // Navigate to the homepage
});

test('Ensure today is the preselected date on the calendar', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  
  // Book the first room
  await bookingPage.bookFirstRoom();

  // Find and store the date of the day which has been highlighted in blue on the calendar
  const dayOfMonth: number = new Date().getDate();
  const element = page.locator('div.rbc-date-cell.rbc-now.rbc-current > button');
  const elementText = await element.textContent();

  //compare date of selected day to todays date
  expect(elementText).toBe('' + dayOfMonth + '');

});

test('Verify room booking functionality', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  
  // Book the first room and interact with the calendar
  await bookingPage.bookFirstRoom();
  await bookingPage.dragAndDropBooking();  // Perform drag-and-drop action

  // Fill in the booking form
  await bookingPage.fillBookingForm('Shaun', 'Test', 'shaun@test.com', '934394049484');

  // Confirm the booking
  await bookingPage.confirmBooking();

  // Validate that booking was successful
  await expect(page.locator('text="Booking Successful!"')).toBeVisible;
});

test('Ensure that Booking page meets the WCAG 2.0 AA accessibility standards', async ({ page }, testInfo) => {
  const bookingPage = new BookingPage(page);
  
  // Open the booking view
  await bookingPage.bookFirstRoom();
  
  // Execute axebuilder accessibilty scanner against the booking page
  const axeBuilder = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    await testInfo.attach('accessibility-results-report-ShadyMeadowsBookingPage', {
      body: JSON.stringify(axeBuilder, null, 2),
      contentType: 'application/json',
    });

    expect(axeBuilder.violations).toEqual([]);
  });
