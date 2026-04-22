// page-objects/frames-page.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  menu: 'Alerts, Frame & Windows',  
  menuItem: 'Frames',
  url: 'frames',
  header: 'Frames',
};

export class FramesPage extends BasePage implements NavigablePage {
  readonly goto;
  private readonly frameOne = this.page.locator('#frame1');
    
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
        await expect(this.frameOne).toBeVisible();
      }
    
      async assertOnPage(): Promise<void> {
        await expect(this.page).toHaveURL(config.url);
        await this.waitForPageReady();
      }
    }
    
