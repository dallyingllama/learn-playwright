//pageObjects/BasePage.ts
import { Page } from '@playwright/test';
import { SidebarMenu } from './components/SidebarMenu';

export class BasePage {
  protected readonly page: Page;
  readonly sidebarMenu: SidebarMenu;

  constructor(page: Page) {
    this.page = page;
    this.sidebarMenu = new SidebarMenu(page); 
  }

  async waitForPageReady(): Promise<void> {
    // This can be overridden in child pages like TextBoxPage
  }

  // Common methods (e.g., waitForHeader, footer, etc.)
}
