// pageObjects/UploadAndDownloadPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Upload and Download',
  url: 'upload-download',
  header: 'Upload and Download',
};

export class UploadAndDownloadPage extends BasePage implements NavigablePage {
  readonly goto;
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
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await expect(this.page.locator('h1')).toHaveText(config.header);
  }
}
