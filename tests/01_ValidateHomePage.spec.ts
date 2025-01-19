import { test, expect } from '@playwright/test';

test('Validate that restful-booker page loads as expected', async ({ page }) => {
  // Go to URL
  await page.goto('https://automationintesting.online/');

  // Validate that restful booker page loads with the correct title
  await expect(page).toHaveTitle('Restful-booker-platform demo')

  // Ensure hotel image loads on the homepage
  await expect(page.getByRole('img', { name: 'Hotel logoUrl' })).toBeVisible
});

test('Validate that contact us form can be submitted with all fields completed,', async ({ page }) => {
  // Go to URL
  await page.goto('https://automationintesting.online/');

  // complete name, email, phone, subject and message fields
  await page.getByTestId('ContactName').click();
  await page.getByTestId('ContactName').fill('Shaun Graham');
  await page.getByTestId('ContactName').press('Tab');
  await page.getByTestId('ContactEmail').fill('shaun@test.com');
  await page.getByTestId('ContactPhone').click();
  await page.getByTestId('ContactPhone').fill('316555017800');
  await page.getByTestId('ContactSubject').click();
  await page.getByTestId('ContactSubject').fill('Booking enquiry');
  await page.getByTestId('ContactDescription').click();
  await page.getByTestId('ContactDescription').fill('Hi, I would like to know if i can book a room for the 14th february. \n\nThanks');

  //click submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  //Validate that form submition is displayed as expected
  await expect(page.getByText('Thanks for getting in touch Shaun Graham!We\'ll get back to you aboutBooking')).toBeVisible

});


test('Validate that contact us form cannot be submitted if phone number is left blank,', async ({ page }) => {
  // Go to URL
  await page.goto('https://automationintesting.online/');

  // complete name, email, subject and message fields
  await page.getByTestId('ContactName').click();
  await page.getByTestId('ContactName').fill('Shaun Graham');
  await page.getByTestId('ContactName').press('Tab');
  await page.getByTestId('ContactEmail').fill('shaun@test.com');
  await page.getByTestId('ContactSubject').click();
  await page.getByTestId('ContactSubject').fill('Booking enquiry');
  await page.getByTestId('ContactDescription').click();
  await page.getByTestId('ContactDescription').fill('Hi, I would like to know if i can book a room for the 14th february. \n\nThanks');

  //click submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  //Validate that correct error messages are displayed as expected.
  await expect(page.getByText('Phone must be between 11 and 21 characters')).toBeVisible
  await expect(page.getByText('Phone may not be blank')).toBeVisible

});

