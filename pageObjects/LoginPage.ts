import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators for https://demoqa.com/login
  private usernameInput = '#userName';
  private passwordInput = '#password';
  private loginButton = '#login';
  private errorMessage = '#name';
  private logoutButton = '#submit';

  async goTo() {
    await this.page.goto('/login'); // Relies on BASE_URL from env
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  
  async expectSuccessfulLogin() {
    await expect(this.page.locator('#userName-value')).toBeVisible(); // or another post-login element
  }
  
  async expectFailedLogin() {
    await expect(this.page.locator('[id="name"]')).toContainText('Invalid username or password!');
  }

  async expectFieldInvalid(selector: string) {
    const field = this.page.locator(selector);
    await expect(field).toHaveClass(/is-invalid/);
  }

}
  