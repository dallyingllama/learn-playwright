// tests/checkBox.spec.ts
import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../pageObjects/CheckBoxPage';

test.describe('Elements', { tag: '@sanity' }, () => {
  test.describe('✅ Check Box', () => {
    async function navigateToCheckBoxPage(page): Promise<CheckBoxPage> {
      return await test.step('🌐 Navigate to Check Box page', async () => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.goto();
        return checkBoxPage;
      });
    }

    test.describe('✅ Check Box - Expand all and check all boxes', () => {
      const strategies: ('viaText' | 'viaCheckbox' | 'viaIcon')[] = ['viaText', 'viaCheckbox', 'viaIcon'];

      for (const method of strategies) {
        test(`should expand and check all boxes ${method}`, async ({ page }) => {
          const checkBoxPage = await navigateToCheckBoxPage(page);

          await test.step('🔽 Expand all items', async () => {
            await checkBoxPage.expandAll();
          });

          await test.step(`☑️ Check all boxes using method "${method}"`, async () => {
            await checkBoxPage.checkAll({ method });
          });

          await test.step('✅ Verify all expected output items are checked', async () => {
            const checkedBoxes = await checkBoxPage.getCheckedBoxCount();
            expect(checkedBoxes).toBeGreaterThan(0);

            const expectedItems = [
              'Desktop', 'Notes', 'Commands', 'Documents', 'WorkSpace', 'React', 'Angular', 'Veu', 'Office',
              'Public', 'Private', 'Classified', 'General', 'Downloads', 'Word File.doc', 'Excel File.doc',
            ];

            for (const item of expectedItems) {
              const found = await checkBoxPage.isOutputItemPresent(item);
              expect(found, `Expected output to contain "${item}" (case-insensitive without spaces)`).toBe(true);
            }
          });
        });
      }
    });

    test('✅ Drill-down Home → Office → Public and check the box', async ({ page }) => {
      const checkBoxPage = await navigateToCheckBoxPage(page);

      await test.step('🔽 Expand Home > Documents > Office', async () => {
        await checkBoxPage.expand('Home');
        await checkBoxPage.expand('Documents');
        await checkBoxPage.expand('Office');
      });

      await test.step('☑️ Check Public checkbox (text + checkbox)', async () => {
        await checkBoxPage.check('Public');
        await checkBoxPage.check('Public', { method: 'viaCheckbox' });
      });

      await test.step('✅ Verify Public is selected', async () => {
        expect(await checkBoxPage.isOutputItemPresent('Public')).toBe(true);
        expect(await checkBoxPage.isCheckboxChecked('Public')).toBe(true);
        await checkBoxPage.expectCheckboxVisible('Public');
      });
    });

    test('✅ Drill-down and select Notes under Desktop', async ({ page }) => {
      const checkBoxPage = await navigateToCheckBoxPage(page);

      await test.step('🔽 Expand Home > Desktop', async () => {
        await checkBoxPage.expand('Home');
        await checkBoxPage.expand('Desktop');
      });

      await test.step('☑️ Check Notes checkbox', async () => {
        await checkBoxPage.check('Notes');
      });

      await test.step('✅ Verify Notes is selected', async () => {
        expect(await checkBoxPage.isOutputItemPresent('Notes')).toBe(true);
        expect(await checkBoxPage.isCheckboxChecked('Notes')).toBe(true);
        await checkBoxPage.expectCheckboxVisible('Notes');
      });
    });
  });
});
