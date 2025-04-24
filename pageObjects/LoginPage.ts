import { expect, Page } from '@playwright/test'

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
  private errorMessage = '[data-test="error"]';
  private title = '.title';

  // Methods
  // go to root url setup in .env for the enviornment
  async goTo() {
    await this.page.goto('/');
  }
  

  // login
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async loginSuccessful() {
    await this.page.waitForURL(/.inventory/);
    await expect(this.page.locator(this.title)).toHaveText('Products');
  }

  async loginFailed() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible()
  }

}