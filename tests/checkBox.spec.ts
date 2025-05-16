//tests/checkBox.spec.ts
import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../pageObjects/CheckBoxPage';


  test.describe('Elements', { tag: '@sanity' }, () => {
    test.describe('✅ Check Box', () => {
      test.describe('✅ Check Box - Expand all and check all boxes', () => {
        const strategies: ('viaText' | 'viaCheckbox' | 'viaIcon')[] = ['viaText', 'viaCheckbox', 'viaIcon'];
      
        for (const method of strategies) {
          test(`should expand and check all boxes ${method}`, async ({ page }) => {
            const checkBoxPage = new CheckBoxPage(page);
            await checkBoxPage.goto();
            await checkBoxPage.expandAll();
            await checkBoxPage.checkAll({ method });
            // Check DOM for 'checked' class (on the root)
            const checkedBoxes = await checkBoxPage.getCheckedBoxCount();
            expect(checkedBoxes).toBeGreaterThan(0);
            const expectedItems = [
              'Desktop', 'Notes', 'Commands', 'Documents', 'WorkSpace', 'React', 'Angular', 'Veu', 'Office', 'Public', 'Private',
              'Classified', 'General', 'Downloads', 'Word File.doc', 'Excel File.doc',
            ];
            for (const item of expectedItems) {
              const found = await checkBoxPage.isOutputItemPresent(item);
              expect(found, `Expected output to contain "${item}" (case-insensitive without spaces)`).toBe(true);
            }
          });
        }
      });
      
      test('✅ Drill-down Home - Office - Public and check the box', async ({ page }) => {
        const checkBox = 'Public';
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.goto();
        await checkBoxPage.expand('Home');
        await checkBoxPage.expand('Documents');
        await checkBoxPage.expand('Office');
        await checkBoxPage.check('Public');
        await checkBoxPage.check('Public', { method: 'viaCheckbox' });
        const found = await checkBoxPage.isOutputItemPresent('Public');
        expect(found, `Expected output to contain Public (case-insensitive without spaces)`).toBe(true);
        expect(await checkBoxPage.isCheckboxChecked('Public')).toBe(true);
        await checkBoxPage.expectCheckboxVisible('Public');     
      });

      test('✅ Drill-down and select Notes under Desktop', async ({ page }) => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.goto();
        await checkBoxPage.expand('Home');
        await checkBoxPage.expand('Desktop');
        await checkBoxPage.check('Notes');

        expect(await checkBoxPage.isOutputItemPresent('Notes')).toBe(true);
        expect(await checkBoxPage.isCheckboxChecked('Notes')).toBe(true);
        await checkBoxPage.expectCheckboxVisible('Notes');  
      });
    });
});