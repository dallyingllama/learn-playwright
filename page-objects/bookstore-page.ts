// page-objects/bookstore-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  card: 'Book Store Application',
  menuItem: 'Book Store Application',
  url: 'books',
  header: 'Book Store',
};

export class BookstorePage extends BasePage implements NavigablePage {
  readonly goto;
  private readonly table = this.page.getByRole('table');
  private readonly pageIndicator = this.page.getByText('Page 1 of 0');
  private readonly loadingIndicator = this.page.getByText('Loading...');

  constructor(page: Page) {
    super(page);

    this.goto = createGotoWithVariants(
      async () => {
        await this.openSidebarFromHome(config.card);
        await this.waitForPageReady();
      },
      async () => {
        await this.page.goto(config.url);
        await this.waitForPageReady();
      }
    );
  }

  // Locators
  private searchInput = '#searchBox';
  private bookTitle = (title: string) => this.page.locator('a', { hasText: title });

  private getHeaderRowGroup(): Locator {
    return this.table.getByRole('rowgroup').first();
  }

  private getBodyRowGroup(): Locator {
    return this.table.getByRole('rowgroup').nth(1);
  }

  override async waitForPageReady(): Promise<void> {
    if (await this.loadingIndicator.isVisible().catch(() => false)) {
      await expect(this.loadingIndicator).toBeHidden({ timeout: 15000 });
    }

    await expect(this.page.locator('#searchBox')).toBeVisible({ timeout: 15000 });
    await expect(this.getHeaderRowGroup()).toContainText('Title');
  }
  
  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await expect(this.page.locator('#searchBox')).toBeVisible();
  }

  // Page actions
  async searchBook(title: string): Promise<void> {
    await this.page.fill(this.searchInput, title);
    await expect(this.page.locator(this.searchInput)).toHaveValue(title);
  }

  async expectBookToBeVisible(title: string): Promise<void> {
    await expect(this.bookTitle(title)).toBeVisible();
  }

  async expectNoResults(): Promise<void> {
    await expect(this.getBodyRowGroup()).toBeEmpty();
    await expect(this.pageIndicator).toBeVisible();
  }
}
