import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://automationintesting.online/');
  
});

test('Validate that shady meadows page loads as expected', async ({ page }) => {

  // Validate that shady meadows page loads with the correct title
  await expect(page).toHaveTitle('Restful-booker-platform demo')

  // Ensure hotel image loads on the homepage
  await expect(page.getByRole('img', { name: 'Hotel logoUrl' })).toBeVisible

});

test('Validate that contact us form can be submitted with all fields completed,', async ({ page }) => {

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

  // complete name, email, subject and message fields
  await page.getByTestId('ContactName').click();
  await page.getByTestId('ContactName').fill('Shaun test');
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

test('Validate that the B&B contact details are correct', async ({ page }) => {

   // Verify B&B name
   const bnbName = page.locator('#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(1)'); // Adjust selector based on the DOM
   await expect(bnbName).toHaveText('Shady Meadows B&B');
 
   // Verify address details
   const address = page.locator('#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(2)'); // Adjust selector based on the DOM
   await expect(address).toContainText('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S');
 
   // Verify contact number
   const phone = page.locator('#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(3)'); // Adjust selector based on the DOM
   await expect(phone).toContainText('012345678901');

   const email = page.locator('#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(4)'); // Adjust selector based on the DOM
   await expect(email).toContainText('fake@fakeemail.com');

});

test('Ensure that homepage meets the WCAG 2.0 AA accessibilty standards', async ({ page }, testInfo) => {
  //checks entire page
  const axeBuilder = await new AxeBuilder({ page })
  .withTags(["wcag2aa"])
  .analyze();

  await testInfo.attach("accessibilty-results-report-homepage", {
    body: JSON.stringify(axeBuilder, null, 2),
    contentType: "application/json"
  });
  expect (axeBuilder.violations).toEqual([]);

});

