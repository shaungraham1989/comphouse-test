import { Page, expect } from '@playwright/test';

export class ShadyMeadowsHomePage {
  private readonly page: Page;

  // Selectors (defined but not initialized)
 
  private readonly contactNameInput;
  private readonly contactEmailInput;
  private readonly contactPhoneInput;
  private readonly contactSubjectInput;
  private readonly contactDescriptionInput;
  private readonly submitButton;
  

  constructor(page: Page) {
    this.page = page;

    // Initialise locators inside the constructor
    this.contactNameInput = this.page.getByTestId('ContactName');
    this.contactEmailInput = this.page.getByTestId('ContactEmail');
    this.contactPhoneInput = this.page.getByTestId('ContactPhone');
    this.contactSubjectInput = this.page.getByTestId('ContactSubject');
    this.contactDescriptionInput = this.page.getByTestId('ContactDescription');
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });

  }

  async goTo() {
    await this.page.goto('https://automationintesting.online/');
  }

 

  async fillContactForm(
    name: string,
    email: string,
    phone: string,
    subject: string,
    description: string
  ) {
    await this.contactNameInput.fill(name);
    await this.contactEmailInput.fill(email);
    await this.contactPhoneInput.fill(phone);
    await this.contactSubjectInput.fill(subject);
    await this.contactDescriptionInput.fill(description);
  }

  async submitForm() {
    await this.submitButton.click();
  }

}
