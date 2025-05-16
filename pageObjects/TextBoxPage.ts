// pageObjects/TextBoxPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Text Box',
  url: '/text-box',
  header: 'Text Box',
};

export class TextBoxPage extends BasePage implements NavigablePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;

  readonly output: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;
  readonly outputCurrentAddress: Locator;
  readonly outputPermanentAddress: Locator;

  readonly goto;

  constructor(page: Page) {
    super(page);

    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');

    this.output = page.locator('#output');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('p#currentAddress');
    this.outputPermanentAddress = page.locator('p#permanentAddress');

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

  async fillForm(data: {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.currentAddressInput.fill(data.currentAddress);
    await this.permanentAddressInput.fill(data.permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(config.url));
    await expect(this.page.locator('h1')).toHaveText(config.header);
  }
}
