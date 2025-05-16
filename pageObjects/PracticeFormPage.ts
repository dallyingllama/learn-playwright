// pageObjects/PracticeFormPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Forms',
  menuItem: 'Practice Form',
  url: 'automation-practice-form',
  header: 'Practice Form',
};

export class PracticeFormPage extends BasePage implements NavigablePage {
  readonly goto;
  readonly expandAllButton: Locator;
  readonly resultOutput: Locator;

  constructor(page: Page) {
    super(page);
    this.expandAllButton = page.locator('button[title="Expand all"]');
    this.resultOutput = page.locator('#result');
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

  async expandAll() {
    await this.expandAllButton.click(); // Expand all checkboxes
  }

  async checkAll() {
    const allCheckBoxes = this.page.locator('.rct-checkbox');
    const count = await allCheckBoxes.count();
    for (let i = 0; i < count; i++) {
      const checkbox = allCheckBoxes.nth(i);
      const parent = checkbox.locator('xpath=..');
      const className = await parent.getAttribute('class');
      if (!className?.includes('check')) {
        await checkbox.click(); // Check all checkboxes
      }
    }
  }

  async expandTo(labelText: string) {
    const toggle = this.page.locator(`label:has-text("${labelText}") >> xpath=../preceding-sibling::button`);
    if (await toggle.count()) {
      await toggle.first().click(); // Expand the specific checkbox group
    }
  }

  async checkBox(labelText: string) {
    const checkbox = this.page.locator(`label:has-text("${labelText}") .rct-checkbox`);
    const parent = checkbox.locator('xpath=..');
    const className = await parent.getAttribute('class');
    if (!className?.includes('check')) {
      await checkbox.click(); // Check the specific checkbox
    }
  }

  async getOutputItems(): Promise<string[]> {
    const items = this.resultOutput.locator('span.text-success');
    const count = await items.count();
    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(await items.nth(i).innerText()); // Retrieve all output items
    }
    return values;
  }

  async getCheckedBoxCount(): Promise<number> {
    return await this.page.locator('.rct-icon-check').count(); // Return the count of checked checkboxes
  }

  async isCheckboxChecked(labelText: string): Promise<boolean> {
    const checkboxIcon = this.page.locator(`label:has-text("${labelText}") .rct-icon-check`);
    return await checkboxIcon.isVisible(); // Check if the checkbox is checked
  }

  async expectCheckboxVisible(labelText: string): Promise<void> {
    const checkboxIcon = this.page.locator(`label:has-text("${labelText}") .rct-icon-check`);
    await expect(checkboxIcon).toBeVisible(); // Ensure the checkbox is visible
  }


}
