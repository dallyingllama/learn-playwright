// pageObjects/BookstorePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  card: 'Book Store Application',
  menuItem: 'Book Store Application',
  url: 'books',
  header: 'Book Store',
};

export class BookstorePage extends BasePage implements NavigablePage {
  readonly goto;

  constructor(page: Page) {
    super(page);

    this.goto = createGotoWithVariants(
      this.gotoViaMenu.bind(this),
      this.gotoViaDirectLink.bind(this)
    );
  }

  // Locators
  private searchInput = '#searchBox';
  private bookTitle = (title: string) => this.page.locator('a', { hasText: title });
  private noRowsFound = this.page.locator('.rt-noData');

  // Goto Methods
  private async gotoViaMenu() {
    await this.page.goto('/');
    const card = this.page.locator('.card-body h5', { hasText: config.card });
    await card.waitFor({ state: 'visible' });
    await card.click();
    await this.waitForPageReady();
  }

  private async gotoViaDirectLink() {
    await this.page.goto(config.url);
    await this.waitForPageReady();
  }

  override async waitForPageReady(): Promise<void> {
    // Wait for a visible element that reliably identifies the Bookstore page
    await expect(this.page.locator('#searchBox')).toBeVisible();
    await expect(this.page.locator('.rt-thead')).toContainText('Title');
  }
  
  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await expect(this.page.locator('#searchBox')).toBeVisible();
  }

  // Page actions
  async searchBook(title: string): Promise<void> {
    await this.page.fill(this.searchInput, title);
  }

  async expectBookToBeVisible(title: string): Promise<void> {
    await expect(this.bookTitle(title)).toBeVisible();
  }

  async expectNoResults(): Promise<void> {
    await expect(this.noRowsFound).toHaveText('No rows found');
  }
}
