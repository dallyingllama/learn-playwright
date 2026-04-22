// page-objects/upload-and-download-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  menu: 'Elements',
  menuItem: 'Upload and Download',
  url: 'upload-download',
  header: 'Upload and Download',
};

export class UploadAndDownloadPage extends BasePage implements NavigablePage {
  readonly goto;
  private readonly downloadButton = this.page.locator('#downloadButton');
  private readonly uploadInput = this.page.locator('#uploadFile');
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
    await expect(this.downloadButton).toBeVisible();
    await expect(this.uploadInput).toBeVisible();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await this.waitForPageReady();
  }
}
