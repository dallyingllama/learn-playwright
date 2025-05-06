// pageObjects/FormPage.ts
import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class FormPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
