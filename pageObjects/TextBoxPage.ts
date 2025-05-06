import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';

export class TextBoxPage extends BasePage {
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

  readonly goto: {
    (): Promise<void>;
    viaMenu: () => Promise<void>;
    viaDirectLink: () => Promise<void>;
  };

  constructor(page: Page) {
    super(page);

    // Inputs
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');

    // Output
    this.output = page.locator('#output');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('p#currentAddress');
    this.outputPermanentAddress = page.locator('p#permanentAddress');

    this.goto = createGotoWithVariants(
      async () => {
        await this.sidebarMenu.navigateTo('Elements', 'Text Box');
        await this.expectOnPage();
      },
      async () => {
        await page.goto('/text-box');
        await this.expectOnPage();
      }
    );
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

  async expectOnPage() {
    await expect(this.fullNameInput).toBeVisible();
  }

  async getEmailField(): Promise<Locator> {
    return this.emailInput;
  }
}
