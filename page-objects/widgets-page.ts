// page-objects/widgets-page.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';
import { sectionMetadata, SECTION_LANDING_MESSAGE } from './metadata/section-metadata';

const config = {
  menu: sectionMetadata.widgets.homeCard,
  message: SECTION_LANDING_MESSAGE,
  url: sectionMetadata.widgets.url,
};

export class WidgetsPage extends BasePage implements NavigablePage {
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
