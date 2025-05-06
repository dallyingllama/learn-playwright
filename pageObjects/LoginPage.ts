//pageObjects/LoginPage.ts
import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  private usernameInputLocator = this.page.locator('#userName');
  private passwordInputLocator = this.page.locator('#password');
  private loginButtonLocator = this.page.locator('#login');
  private logoutButtonLocator = this.page.locator('#submit');
  private errorMessageLocator = this.page.locator('[id="name"]');

  // Go to login page
  async goTo() {
    await this.page.goto('/login');
  }

  // Wait for login form to appear
  async waitForLoginForm() {
    await expect(this.usernameInputLocator).toBeVisible();
    await expect(this.passwordInputLocator).toBeVisible();
    await expect(this.loginButtonLocator).toBeVisible();
  }

    // Combined convenience method
    async openLoginPage() {
      await this.goTo();
      await this.waitForLoginForm();
    }

  // Perform login
  async login(username: string, password: string) {
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.loginButtonLocator.click();
  }

  // Expect successful login
  async expectSuccessfulLogin() {
    await expect(this.page.locator('#userName-value')).toBeVisible();
  }

  // Expect failed login
  async expectFailedLogin() {
    await expect(this.errorMessageLocator).toContainText('Invalid username or password!');
  }

  // Expect invalid field (e.g. empty)
  async expectFieldInvalid(selector: string) {
    const field = this.page.locator(selector);
    await expect(field).toHaveClass(/is-invalid/);
  }
}
