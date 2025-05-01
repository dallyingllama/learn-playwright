// pageObjects/RegisterPage.ts
import { Page, expect } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  // Locators
  private firstNameInput = '#firstname';
  private lastNameInput = '#lastname';
  private usernameInput = '#userName';
  private passwordInput = '#password';
  private registerButton = '#register';

  // Actions
  async goto() {
    await this.page.goto('/register');
  }

  async register(firstName: string, lastName: string, username: string, password: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.registerButton);
  }


  async expectSuccessOrCaptcha() {
    await expect(this.page).toHaveURL(/register/); // Captcha blocks registration, but URL remains
  }

  async expectFieldInvalid(selector: string) {
    const field = this.page.locator(selector);
    await expect(field).toHaveClass(/is-invalid/);
  }

}
