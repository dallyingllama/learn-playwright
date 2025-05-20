// pageObjects/ButtonsPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Buttons',
  url: 'buttons',
  header: 'Buttons',
};
// pageObjects/ButtonsPage.ts
export class ButtonsPage extends BasePage implements NavigablePage {
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

  // Locators
  private doubleClickBtn = this.page.locator('#doubleClickBtn');
  private rightClickBtn = this.page.locator('#rightClickBtn');
  private dynamicClickBtn = this.page.getByRole('button', { name: 'Click Me' }).nth(2); // third 'Click Me' button
  private doubleClickMsg = this.page.locator('#doubleClickMessage');
  private rightClickMsg = this.page.locator('#rightClickMessage');
  private dynamicClickMsg = this.page.locator('#dynamicClickMessage');

  // Actions
  async doubleClick() {
    await this.page.dblclick('#doubleClickBtn');
  }

  async rightClick() {
    await this.page.click('#rightClickBtn', { button: 'right' });
  }

  async dynamicClick() {
    await this.dynamicClickBtn.click();
  }

  async getDoubleClickMessage() {
    return this.doubleClickMsg.textContent();
  }

  async getRightClickMessage() {
    return this.rightClickMsg.textContent();
  }

  async getDynamicClickMessage() {
    return this.dynamicClickMsg.textContent();
  }
}
