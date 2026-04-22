// page-objects/dynamic-properties-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  menu: 'Elements',
  menuItem: 'Dynamic Properties',
  url: 'dynamic-properties',
  header: 'Dynamic Properties',
};

export class DynamicPropertiesPage extends BasePage implements NavigablePage {
  readonly goto;
  private readonly enableAfterButton = this.page.locator('#enableAfter');
  private readonly colorChangeButton = this.page.locator('#colorChange');
  constructor(page: Page) {
    super(page);

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
    }
  
  override async waitForPageReady(): Promise<void> {
    await expect(this.page.locator('h1')).toHaveText(config.header);
    await expect(this.enableAfterButton).toBeVisible();
    await expect(this.colorChangeButton).toBeVisible();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await this.waitForPageReady();
  }
}
