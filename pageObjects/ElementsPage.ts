// pageObjects/ElementsPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class ElementsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
