// tests/radioButton.spec.ts
import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../pageObjects/RadioButtonPage';

test.describe('Elements', () => {
  test.describe('✅ Radio Button', () => {

    test('✅ Select Yes and verify result', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);

      await test.step('Navigate to Radio Button page', async () => {
        await radioPage.goto();
      });

      await test.step('Select "Yes" radio button', async () => {
        await radioPage.selectRadio('Yes');
      });

      await test.step('Verify "Yes" is selected', async () => {
        await radioPage.expectSelected('Yes');
      });
    });

    test('✅ Select Impressive and verify result', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);

      await test.step('Navigate to Radio Button page', async () => {
        await radioPage.goto();
      });

      await test.step('Select "Impressive" radio button', async () => {
        await radioPage.selectRadio('Impressive');
      });

      await test.step('Verify "Impressive" is selected', async () => {
        await radioPage.expectSelected('Impressive');
      });
    });

    test('🚫 No button is disabled', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);

      await test.step('Navigate to Radio Button page', async () => {
        await radioPage.goto();
      });

      await test.step('Check if "No" button is disabled', async () => {
        const isDisabled = await radioPage.isDisabled('No');
        expect(isDisabled).toBe(true);
      });
    });

  });
});
