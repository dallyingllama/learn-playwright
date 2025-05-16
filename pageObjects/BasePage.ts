// pageObjects/BasePage.ts
import { Page } from '@playwright/test';
import { SidebarMenu } from './components/SidebarMenu';

export class BasePage {
  protected readonly page: Page;
  readonly sidebarMenu: SidebarMenu;

  constructor(page: Page) {
    this.page = page;
    this.sidebarMenu = new SidebarMenu(page);
  }

  public getPage(): Page {
    return this.page;
  }

  async openSidebarFromHome(cardTitle: string): Promise<void> {
    // Navigate to home only if not already there
    if (!this.page.url().endsWith('/')) {
      await this.page.goto('/');
    }
    const card = this.page.getByText(cardTitle, { exact: true });
    await card.scrollIntoViewIfNeeded();
    await card.click();

    await this.waitForExpandedSidebar(cardTitle);
  }

  async waitForExpandedSidebar(cardTitle: string): Promise<void> {
    const expandedSidebar = this.page.locator(`.element-group:has-text("${cardTitle}") .element-list.show`);
    await expandedSidebar.waitFor({ state: 'visible' });
  }

  async waitForPageReady(): Promise<void> {
    // This can and should be overridden 
  }

  // Common methods (e.g., waitForHeader, footer, etc.)
}
