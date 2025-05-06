// pageObjects/BookstorePage.ts

import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

export class BookstorePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private searchInput = '#searchBox';
  private bookTitle = (title: string) => this.page.locator('a', { hasText: title });
  private noRowsFound = this.page.locator('.rt-noData');

  async goto() {
    await this.page.goto('/books');
  }

  async searchBook(title: string) {
    await this.page.fill(this.searchInput, title);
  }

  async expectBookToBeVisible(title: string) {
    await expect(this.bookTitle(title)).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.noRowsFound).toHaveText('No rows found');
  }
}
