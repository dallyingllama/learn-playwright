// page-objects/alerts-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/navigable-page';

const config = {
  menu: 'Alerts, Frame & Windows',  
  menuItem: 'Alerts',
  url: 'alerts',
  header: 'Alerts',
};

export class AlertsPage extends BasePage implements NavigablePage {
  readonly goto;
  
  readonly alertButton: Locator;
  readonly timerAlertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  
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
    this.alertButton = page.locator('#alertButton');
    this.timerAlertButton = page.locator('#timerAlertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.promptButton = page.locator('#promtButton');
    this.newTabButton = page.locator('#tabButton');
    this.newWindowButton = page.locator('#windowButton');
  }
  
  override async waitForPageReady(): Promise<void> {
    await expect(this.page.locator('h1')).toHaveText(config.header);
    await expect(this.alertButton).toBeVisible();
    await expect(this.timerAlertButton).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
    await expect(this.promptButton).toBeVisible();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await this.waitForPageReady();
  }
  }
  
