// pageObjects/InteractionsPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class InteractionsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
