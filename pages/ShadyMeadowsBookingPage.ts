import { Page, Locator } from '@playwright/test';

export class BookingPage {
  private readonly page: Page;
  private readonly bookRoomButtons: Locator;
  private readonly calendar: Locator;
  private readonly currentDay: Locator;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly emailField: Locator;
  private readonly phoneField: Locator;
  private readonly bookButton: Locator;


  constructor(page: Page) {
    
    this.page = page;

    // Initialise locators inside the constructor
    this.bookRoomButtons = page.getByRole('button', { name: 'Book this room' });
    this.calendar = page.locator('.rbc-calendar');
    this.currentDay = page.locator('.rbc-date-cell.rbc-now');
    this.firstNameField = page.getByPlaceholder('Firstname');
    this.lastNameField = page.getByPlaceholder('Lastname');
    this.emailField = page.locator('input[name="email"]');
    this.phoneField = page.locator('input[name="phone"]');
    this.bookButton = page.getByRole('button', { name: 'Book', exact: true });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
  }

  async bookFirstRoom(): Promise<void> {
    await this.bookRoomButtons.first().click();
    await this.calendar.waitFor();
  }

  async dragAndDropBooking(): Promise<void> {
    const siblingDate = this.currentDay.locator('xpath=following-sibling::*[1]');
    await this.currentDay.dragTo(siblingDate);
  }

  async fillBookingForm(firstName: string, lastName: string, email: string, phone: string): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
  }

  async confirmBooking(): Promise<void> {
    await this.bookButton.click();
  }

}
