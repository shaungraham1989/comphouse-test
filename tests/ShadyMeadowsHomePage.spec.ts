import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ShadyMeadowsHomePage } from '../pages/ShadyMeadowsHomePage';

test.describe('Shady Meadows Tests', () => {
  let shadyMeadowsHomePage: ShadyMeadowsHomePage;

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    shadyMeadowsHomePage = new ShadyMeadowsHomePage(page); // Initialize the page object
    await shadyMeadowsHomePage.goTo();
  });

  test('TC_001 Validate that Shady Meadows page loads as expected', async ({ page }) => {
   
  // Validate that shady meadows page loads with the correct title
  await expect(page).toHaveTitle('Restful-booker-platform demo')

  // Ensure hotel image loads on the homepage
  await expect(page.getByRole('img', { name: 'Hotel logoUrl' })).toBeVisible

  });

  test('TC_002 Validate that contact us form can be submitted with all fields completed', async ({ page }) => {
    await shadyMeadowsHomePage.fillContactForm(
      'Shaun Graham',
      'shaun@test.com',
      '316555017800',
      'Booking enquiry',
      'Hi, I would like to know if I can book a room for the 14th February'
    );

    await shadyMeadowsHomePage.submitForm();
    //Validate that form submition is displayed as expected
    await expect(page.getByText('Thanks for getting in touch Shaun Graham!We\'ll get back to you aboutBooking')).toBeVisible

  });

  test('TC_003 Validate that contact us form cannot be submitted if phone number is left blank', async ({ page }) => {
    await shadyMeadowsHomePage.fillContactForm(
      'Shaun Graham',
      'shaun@test.com',
      '',
      'Booking enquiry',
      'Hi, I would like to know if I can book a room for the 14th February. \n\nThanks'
    );

    await shadyMeadowsHomePage.submitForm();
    
    await expect(page.getByText('Phone must be between 11 and 21 characters')).toBeVisible
    await expect(page.getByText('Phone may not be blank')).toBeVisible
  });

  test('TC_004 Validate that the B&B contact details are correct', async ({ page }) => {
    const bnbName = page.locator(
      '#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(1)'
    );
    await expect(bnbName).toHaveText('Shady Meadows B&B');

    const address = page.locator(
      '#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(2)'
    );
    await expect(address).toContainText('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S');

    const phone = page.locator(
      '#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(3)'
    );
    await expect(phone).toContainText('012345678901');

    const email = page.locator(
      '#root > div > div > div.row.contact > div:nth-child(3) > p:nth-child(4)'
    );
    await expect(email).toContainText('fake@fakeemail.com');
  });

  test('TC_005 Ensure that ShadyMeadowsHomePage meets the WCAG 2.0 AA accessibility standards', async ({ page }, testInfo) => {
    const axeBuilder = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();

    await testInfo.attach('accessibility-results-report-ShadyMeadowsHomePage', {
      body: JSON.stringify(axeBuilder, null, 2),
      contentType: 'application/json',
    });

    expect(axeBuilder.violations).toEqual([]);
  });
});
