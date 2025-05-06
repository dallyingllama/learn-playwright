// pageObjects/HomePage.ts
import { Page } from '@playwright/test';
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
    // For demoqa, direct navigation and menu are effectively the same
    await this.page.goto('/');
  }

  private async gotoViaDirectLink() {
    await this.page.goto('https://demoqa.com'); // Absolute URL if needed
  }

  async clickCard(sectionName: string) {
    const card = this.page.locator('.card-body h5', { hasText: sectionName });
    await card.waitFor({ state: 'visible' });
    await card.scrollIntoViewIfNeeded();
    await card.click();
  }
}
