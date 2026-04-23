import { expect, test } from '@playwright/test';
import { RadioButtonPage } from '../page-objects/radiobutton-page';

test.describe('Elements', () => {
  test.describe('Radio Button', () => {
    const selectableOptions: Array<'Yes' | 'Impressive'> = ['Yes', 'Impressive'];

    for (const [index, option] of selectableOptions.entries()) {
      test(`Select ${option} and verify result`, index === 0 ? { tag: '@sanity' } : {}, async ({ page }) => {
        const radioPage = new RadioButtonPage(page);

        await test.step('Navigate to Radio Button page', async () => {
          await radioPage.goto.random();
        });

        await test.step(`Select "${option}" radio button`, async () => {
          await radioPage.selectRadio(option);
        });

        await test.step(`Verify "${option}" is selected`, async () => {
          await radioPage.expectSelected(option);
        });
      });
    }

    test('No button is disabled', async ({ page }) => {
      const radioPage = new RadioButtonPage(page);

      await test.step('Navigate to Radio Button page', async () => {
        await radioPage.goto.random();
      });

      await test.step('Check if "No" button is disabled', async () => {
        const isDisabled = await radioPage.isDisabled('No');
        expect(isDisabled).toBe(true);
      });
    });
  });
});
