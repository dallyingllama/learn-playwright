// pageObjects/components/SidebarMenu.ts
import { Page, Locator } from '@playwright/test';

export class SidebarMenu {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

async navigateTo(menuItem: string) {
  const sidebar = this.page.locator('.element-list');
  const linkItem = sidebar.getByRole('link', { name: new RegExp(`^${menuItem}$`, 'i') });
  const fallbackItem = sidebar.getByText(menuItem, { exact: true });

  if (await linkItem.count() > 0) {
    await linkItem.first().scrollIntoViewIfNeeded();
    await linkItem.first().click();
  } else if (await fallbackItem.count() > 0) {
    await fallbackItem.scrollIntoViewIfNeeded();
    await fallbackItem.click();
  } else {
    throw new Error(`Sidebar item "${menuItem}" not found.`);
  }
}

}
