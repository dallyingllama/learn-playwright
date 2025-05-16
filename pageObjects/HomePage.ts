// pageObjects/HomePage.ts
import { Page, expect } from '@playwright/test';
import { createGotoWithVariants } from '../utils/gotoHelper';

export class HomePage {
  readonly page: Page;

  readonly goto: {
    (): Promise<void>;
    viaMenu: () => Promise<void>;
    viaDirectLink: () => Promise<void>;
  };

  constructor(page: Page) {
    this.page = page;

    this.goto = createGotoWithVariants(
      this.gotoViaMenu.bind(this),
      this.gotoViaDirectLink.bind(this)
    );
  }

  private async gotoViaMenu() {
    await this.page.goto('/');
  }

  private async gotoViaDirectLink() {
    await this.page.goto('/');
  }

  async clickCard(sectionName: string) {
    const card = this.page.locator('.card-body h5', { hasText: sectionName });
    await card.waitFor({ state: 'visible' });
    await card.scrollIntoViewIfNeeded();
    await card.click();
  }

  async assertOnPage() {
    // URL check
    await expect(this.page).toHaveURL(/\/$/);

    // UI element check (for demoqa homepage)
    await expect(this.page.locator('.home-body')).toBeVisible();
  }
}
