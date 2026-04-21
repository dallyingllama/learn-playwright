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
};

const parentByLabel: Record<string, string | undefined> = {
  Home: undefined,
  Desktop: 'Home',
  Documents: 'Home',
  WorkSpace: 'Documents',
  Office: 'Documents',
  Downloads: 'Home',
  Notes: 'Desktop',
  Commands: 'Desktop',
  React: 'WorkSpace',
  Angular: 'WorkSpace',
  Veu: 'WorkSpace',
  Public: 'Office',
  Private: 'Office',
  Classified: 'Office',
  General: 'Office',
  'Word File.doc': 'Downloads',
  'Excel File.doc': 'Downloads',
};

export class CheckBoxPage extends BasePage implements NavigablePage {
  readonly goto;
  private readonly treeRootTitle = this.page.locator('.rc-tree-title', { hasText: 'Home' }).first();

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
    await expect(this.treeRootTitle).toBeVisible();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await this.waitForPageReady();
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private getTreeItem(labelText: string): Locator {
    return this.page.getByRole('treeitem').filter({
      hasText: new RegExp(`\\b${this.escapeRegex(labelText)}\\b`),
    }).first();
  }

  private getNode(labelText: string): Locator {
    return this.page.locator('.rc-tree-treenode').filter({
      hasText: new RegExp(`\\b${this.escapeRegex(labelText)}\\b`),
    }).first();
  }

  private getTitle(labelText: string): Locator {
    return this.getNode(labelText).locator('.rc-tree-title').first();
  }

  private getToggle(labelText: string): Locator {
    return this.getNode(labelText).locator('.rc-tree-switcher').first();
  }

  private getCheckbox(labelText: string): Locator {
    return this.getNode(labelText).locator('.rc-tree-checkbox').first();
  }

  private async clickToggle(labelText: string): Promise<void> {
    const toggle = this.getToggle(labelText);
    if (!await toggle.count()) {
      return;
    }

    try {
      await toggle.click({ force: true });
    } catch {
      await toggle.evaluate((element: HTMLElement) => element.click());
    }
  }

  async expectNodeVisible(labelText: string): Promise<void> {
    const title = this.getTitle(labelText);
    if (await title.count()) {
      await expect(title).toBeVisible();
      return;
    }

    await expect(this.getTreeItem(labelText)).toBeVisible();
  }

  async expand(label: string, expectedFirstChild?: string): Promise<void> {
    const parent = parentByLabel[label];
    if (parent) {
      await this.expand(parent);
    }

    await this.expectNodeVisible(label);

    const toggle = this.getToggle(label);
    if (!await toggle.count()) {
      return;
    }

    const toggleClass = await toggle.getAttribute('class');
    if (toggleClass?.includes('rc-tree-switcher_open') || toggleClass?.includes('rc-tree-switcher-noop')) {
      return;
    }

    await this.clickToggle(label);

    if (expectedFirstChild) {
      await this.expectNodeVisible(expectedFirstChild);
    }
  }

  async check(label: string): Promise<void> {
    await this.expectNodeVisible(label);
    const checkbox = this.getCheckbox(label);
    await expect(checkbox).toBeVisible();
    await checkbox.click({ force: true });
  }

  async expectChecked(label: string): Promise<void> {
    await expect(this.getNode(label).locator('.rc-tree-checkbox')).toHaveClass(/rc-tree-checkbox-checked/);
  }

  async expectIndeterminate(label: string): Promise<void> {
    await expect(this.getNode(label).locator('.rc-tree-checkbox')).toHaveClass(/rc-tree-checkbox-indeterminate/);
  }

  async getSelectedItems(): Promise<string[]> {
    const items = this.page.locator('#result .text-success');
    await expect(items.first()).toBeVisible();
    const count = await items.count();
    const values: string[] = [];

    for (let i = 0; i < count; i++) {
      values.push((await items.nth(i).innerText()).trim());
    }

    return values;
  }

  async expectSelectedItems(expectedItems: string[]): Promise<void> {
    await expect(this.page.locator('#result')).toBeVisible();
    await expect.poll(async () => this.getSelectedItems()).toEqual(expectedItems);
  }


}
