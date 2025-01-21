import { test, expect } from '@playwright/test';
import { link } from 'fs';


test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('https://automationintesting.online/');
  });

test('Validate that user can sign into Admin Panel', async ({ page }) => {

    // Loads the Admin Panel log in screen and signs in with username and password
    await page.getByRole('link', { name: 'Admin panel', exact: true }).click();
    await page.getByTestId('username').click();
    await page.getByTestId('username').fill('admin');
    await page.getByTestId('username').press('Tab');
    await page.getByTestId('password').fill('password');
    await page.getByTestId('submit').click();
  
    // Ensures that the logout button is showing signalling user has logged in successfully
    await expect(page.getByText('Logout')).toBeVisible
});