// pageObjects/LinksPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Links',
  url: 'links',
  header: 'Links',
};

export class LinksPage extends BasePage implements NavigablePage {
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

  private readonly simpleLink = this.page.getByRole('link', { name: 'Home', exact: true });
  private readonly dynamicLink = this.page.locator('#dynamicLink');
  private readonly responseOutput = this.page.locator('#linkResponse');

  private createdLink = this.page.getByRole('link', { name: 'Created' });
  private noContentLink = this.page.getByRole('link', { name: 'No Content' });
  private movedLink = this.page.getByRole('link', { name: 'Moved' });
  private linkResponse = this.page.locator('#linkResponse');

  // Actions
  async clickSimpleHomeLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.simpleLink.click()
    ]);
    return newPage.url(); // Capture the URL of the new tab
  }

  async clickDynamicHomeLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.dynamicLink.click()
    ]);
    return newPage.url(); // Capture the URL of the new tab
  }

  async clickApiLink(linkType: 'created' | 'noContent' | 'moved') {
    const linkMap = {
      created: this.createdLink,
      noContent: this.noContentLink,
      moved: this.movedLink,
    };
    await linkMap[linkType].click();
  }

  async getLinkResponseText(): Promise<string> {
    return (await this.linkResponse.textContent())?.trim() ?? '';
  }

// Methods to click links and validate response
async clickLinkAndWaitForResponse(linkId: string): Promise<void> {
  const link = this.page.locator(`#${linkId}`);
  await link.click();
  await expect(this.responseOutput).toBeVisible();
}

async assertResponseTextContains(text: string): Promise<void> {
  await expect(this.responseOutput).toContainText(text);
}  
}
