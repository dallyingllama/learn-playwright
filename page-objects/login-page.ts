// page-objects/login-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  menu: 'Book Store Application',
  menuItem: 'Login',
  url: 'login',
  header: 'Login',
};

export class LoginPage extends BasePage implements NavigablePage {
  readonly goto;
  private readonly loginErrorMessage = 'Invalid username or password!';

  // Locators
  private usernameInputLocator: Locator;
  private passwordInputLocator: Locator;
  private loginButtonLocator: Locator;
  private logoutButtonLocator: Locator;
  private errorMessageLocator: Locator;

  constructor(page: Page) {
    super(page);

    // Setup goto helper
    this.goto = createGotoWithVariants(
      async () => {
        await this.openSidebarFromHome(config.menu);
        await this.sidebarMenu.navigateTo(config.menuItem);
        await this.waitForPageReady();
      },
      async () => {
        await this.page.goto(config.url);
        await this.waitForPageReady();
      }
    );

    // Locators
    this.usernameInputLocator = page.locator('#userName');
    this.passwordInputLocator = page.locator('#password');
    this.loginButtonLocator = page.locator('#login');
    this.logoutButtonLocator = page.getByRole('button', { name: 'Logout' });
    this.errorMessageLocator = page.getByText(this.loginErrorMessage);
  }

  override async waitForPageReady(): Promise<void> {
    await expect(this.page.locator('h1')).toHaveText(config.header);
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await expect(this.page.locator('h1')).toHaveText(config.header);
  }

  async waitForLoginForm() {
    await expect(this.usernameInputLocator).toBeVisible();
    await expect(this.passwordInputLocator).toBeVisible();
    await expect(this.loginButtonLocator).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.loginButtonLocator.click();
  }

  async expectSuccessfulLogin(username: string) {
    await expect(this.page).toHaveURL(/\/profile$/);
    await expect(this.logoutButtonLocator).toBeVisible();
    await expect(this.page.getByText(username, { exact: false })).toBeVisible();
  }

  async expectFailedLogin() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.errorMessageLocator).toBeVisible();
  }

  async expectFieldInvalid(selector: string) {
    const field = this.page.locator(selector);
    await expect(field).toHaveClass(/is-invalid/);
  }
}
