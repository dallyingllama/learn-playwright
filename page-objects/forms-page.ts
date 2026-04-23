// page-objects/FormPage.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  menu: 'Forms',
  message: 'Please select an item from left to start practice.',
  url: 'forms',
};

export class FormsPage extends BasePage implements NavigablePage {
  readonly goto;

  constructor(page: Page) {
    super(page);
    this.goto = createGotoWithVariants(
      async () => {
        await this.openSidebarFromHome(config.menu);
        await this.waitForPageReady();
      },
      async () => {
        await this.page.goto(config.url);
        await this.waitForPageReady();
      }
    );
  }

  override async waitForPageReady(): Promise<void> {
    await expect(this.page.getByText(config.message)).toBeVisible();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await this.waitForPageReady();
  }
}
