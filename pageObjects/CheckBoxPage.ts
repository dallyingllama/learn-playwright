// pageObjects/CheckBoxPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Check Box',
  url: 'checkbox',
  header: 'Check Box',
  topNodeCheckboxText: 'Home',
};

export class CheckBoxPage extends BasePage implements NavigablePage {
  readonly expandAllButton: Locator;
  readonly resultOutput: Locator;
  readonly goto;

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

  async checkAll({
    expand = true,
    method = Math.random() > 0.66 ? 'viaText' : (Math.random() > 0.5 ? 'viaCheckbox' : 'viaIcon'), // Random default
  }: {
    expand?: boolean;
    method?: 'viaText' | 'viaCheckbox' | 'viaIcon';
  } = {}): Promise<void> {
    if (expand) {
      await this.expandAll();
    }
  
    switch (method) {
      case 'viaCheckbox': {
        const checkbox = this.page.locator('label').filter({ hasText: config.topNodeCheckboxText }).getByRole('img').first()
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        break;
      }
  
      case 'viaIcon': {
        const icon = this.page.locator('.rct-icon-parent-close, .rct-icon-parent-open')
          .first();
        await expect(icon).toBeVisible();
        await icon.click();
        break;
      }
  
      case 'viaText':
      default: {
        const label = this.page.getByText(config.topNodeCheckboxText);
        await expect(label).toBeVisible();
        await expect(label).toBeEnabled();
        await label.click();
        break;
      }
    }
  }
  
  async uncheckAll() {
    const checkbox = this.page.getByRole('checkbox', { name: config.topNodeCheckboxText });
    await checkbox.uncheck(); // Uncheck all checkboxes
  }
 
  async expand(label: string): Promise<void> {
    // 1. Locate the tree node container by its title
    const node = this.page.locator('span.rct-text', {
      has: this.page.locator('span.rct-title', { hasText: new RegExp(`^${label}$`) })
    });
    await expect(node).toBeVisible();
  
    // 2. Select the toggle button in this node
    const toggleBtn = node.locator('button[aria-label="Toggle"]');
    await expect(toggleBtn).toBeVisible();
  
    // 3. Click to toggle expansion
    await toggleBtn.click();
  
    // 4. Wait for the <ul> child inside the same <li role="treeitem">

    const treeItem = node.locator('xpath=parent::li');
    // Wait for its class to include "rct-node-expanded"
    await expect(treeItem).toHaveClass(/.*\brct-node-expanded\b.*/, { timeout: 5000 });
  }

  async check(
    labelText: string,
    {
      expand = true,
      method = Math.random() > 0.66 ? 'viaText' : (Math.random() > 0.5 ? 'viaCheckbox' : 'viaIcon'),
    }: {
      expand?: boolean;
      method?: 'viaText' | 'viaCheckbox' | 'viaIcon';
    } = {}
  ): Promise<void> {
    if (expand) {
      await this.expandAll(); // Optional: adjust if label-specific expansion is needed
    }
  
    switch (method) {
      case 'viaCheckbox': {
        const checkbox = this.page
          .locator('label')
          .filter({ hasText: labelText })
          .getByRole('img')
          .first();
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        break;
      }
  
      case 'viaIcon': {
        const icon = this.page
          .locator('label')
          .filter({ hasText: labelText })
          .locator('.rct-icon-uncheck, .rct-icon-check, .rct-icon-half-check')
          .first();
        await expect(icon).toBeVisible();
        await icon.click();
        break;
      }
  
      case 'viaText':
      default: {
        const label = this.page.getByText(labelText, { exact: true });
        await expect(label).toBeVisible();
        await expect(label).toBeEnabled();
        await label.click();
        break;
      }
    }
  }
  
  async getOutputItems(): Promise<string[]> {
    const items = this.resultOutput.locator('span.text-success');
    const count = await items.count();
    const values: string[] = []; // Explicitly type the array
  
    for (let i = 0; i < count; i++) {
      values.push(await items.nth(i).innerText());
    }
  
    return values;
  }

  async isOutputItemPresent(target: string): Promise<boolean> {
    const normalize = (str: string) =>
      str.replace(/\s+/g, '')           // Remove all spaces
         .toLowerCase()                 // Case-insensitive
         .replace(/\.[a-z0-9]+$/, '');  // Strip file extension
    const outputItems = await this.getOutputItems();
    const normalizedTarget = normalize(target);
    return outputItems.some(item => normalize(item) === normalizedTarget);
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
