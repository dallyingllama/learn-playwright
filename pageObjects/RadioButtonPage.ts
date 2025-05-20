// pageObjects/RadioButtonPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Radio Button',
  url: '/radio-button',
  header: 'Radio Button',
};

export class RadioButtonPage extends BasePage implements NavigablePage {
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

  async selectRadio(option: 'Yes' | 'Impressive' | 'No') {
    await this.page.getByLabel(option).click({ force: true });
  }

  async expectSelected(option: 'Yes' | 'Impressive' | 'No') {
    const result = this.page.locator('.text-success');
    await expect(result).toHaveText(option);
  }

  async isDisabled(option: 'Yes' | 'Impressive' | 'No'): Promise<boolean> {
    return this.page.getByLabel(option).isDisabled();
  }
}
