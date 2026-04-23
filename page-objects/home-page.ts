// page-objects/home-page.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  url: /\/$/,
};

export class HomePage extends BasePage implements NavigablePage {
  readonly goto;

  constructor(page: Page) {
    super(page);
    this.goto = createGotoWithVariants(
      async () => {
        await this.page.goto('/');
        await this.waitForPageReady();
      },
      async () => {
        await this.page.goto('/');
        await this.waitForPageReady();
      }
    );
  }

  override async waitForPageReady(): Promise<void> {
    await expect(this.page.locator('.home-body')).toBeVisible();
  }

  async clickCard(sectionName: string): Promise<void> {
    const categoryCards = this.page.locator('.category-cards');
    const cardLink = categoryCards.getByRole('link', { name: sectionName, exact: true }).first();

    await categoryCards.waitFor({ state: 'visible' });
    await cardLink.waitFor({ state: 'visible' });
    await cardLink.scrollIntoViewIfNeeded();
    await cardLink.click();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await this.waitForPageReady();
  }
}
