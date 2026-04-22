// page-objects/base-page.ts
import { Page } from '@playwright/test';
import { SidebarMenu } from './components/sidebar-menu';

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

  private async gotoHomePage(): Promise<void> {
    try {
      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isRetryableNavigationError =
        message.includes('ERR_ABORTED') || message.includes('Test timeout');

      if (!isRetryableNavigationError) {
        throw error;
      }

      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
  }

  private async clickHomeCard(cardTitle: string): Promise<void> {
    const categoryCards = this.page.locator('.category-cards');
    const cardLink = categoryCards.getByRole('link', { name: cardTitle, exact: true }).first();

    await categoryCards.waitFor({ state: 'visible' });
    await cardLink.waitFor({ state: 'visible' });
    await cardLink.scrollIntoViewIfNeeded();

    try {
      await cardLink.click();
    } catch {
      await cardLink.evaluate((element: HTMLElement) => element.click());
    }
  }

  async openSidebarFromHome(cardTitle: string): Promise<void> {
    // Navigate to home only if not already there
    if (!this.page.url().endsWith('/')) {
      await this.gotoHomePage();
    }
    await this.clickHomeCard(cardTitle);

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
