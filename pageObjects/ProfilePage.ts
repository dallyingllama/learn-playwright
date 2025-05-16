// pageObjects/ProfilePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Book Store Application',
  menuItem: 'Profile',
  url: 'profile',
  header: 'Currently you are not logged',
};

export class ProfilePage extends BasePage implements NavigablePage {
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
        await expect(this.page.getByText(config.header)).toBeVisible();

      }
    
      async assertOnPage(): Promise<void> {
        await expect(this.page).toHaveURL(config.url);
        await expect(this.page.getByText(config.header)).toBeVisible();

      }
    }