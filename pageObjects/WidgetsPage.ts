// pageObjects/WidgetsPage.ts
import { Page, expect } from '@playwright/test';
import { SidebarMenu } from './components/SidebarMenu';
import { createGotoWithVariants } from '../utils/gotoHelper';

const config = {
  card: 'Widgets',
  message: 'Please select an item from left to start practice.',
  menuItem: 'Widgets',
  url: 'widgets',
};

export class WidgetsPage {
  readonly page: Page;
  readonly sidebarMenu: SidebarMenu;

  readonly goto: {
    (): Promise<void>;
    viaMenu: () => Promise<void>;
    viaDirectLink: () => Promise<void>;
  };

  constructor(page: Page) {
    this.page = page;
    this.sidebarMenu = new SidebarMenu(page);

    this.goto = createGotoWithVariants(
      this.gotoViaMenu.bind(this),
      this.gotoViaDirectLink.bind(this)
    );
  }

  private async gotoViaMenu() {
    await this.page.goto('/');
    const card = this.page.locator('.card-body h5', { hasText: config.card });
    await card.waitFor({ state: 'visible' });
    await card.click();
  }

  private async gotoViaDirectLink() {
    await this.page.goto(config.url);
  }

  async assertOnPage() {
    await expect(this.page).toHaveURL(config.url);
    await expect(this.page.getByText(config.message)).toBeVisible();
  }
}
