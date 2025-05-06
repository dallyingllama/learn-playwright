// pageObjects/WidgetsPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class WidgetsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
