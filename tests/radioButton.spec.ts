// tests/radioButton.spec.ts
import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../pageObjects/RadioButtonPage';

test.describe('Elements', () => {
  test.describe('✅ Radio Button', () => {
    test('✅ Select Yes and verify result', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);
      await radioPage.goto();
      await radioPage.selectRadio('Yes');
      await radioPage.expectSelected('Yes');
    });

    test('✅ Select Impressive and verify result', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);
      await radioPage.goto();
      await radioPage.selectRadio('Impressive');
      await radioPage.expectSelected('Impressive');
    });

    test('🚫 No button is disabled', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);
      await radioPage.goto();
      const isDisabled = await radioPage.isDisabled('No');
      expect(isDisabled).toBe(true);
    });
  });
});
