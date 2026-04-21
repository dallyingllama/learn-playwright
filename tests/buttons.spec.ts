// tests/buttons.spec.ts
import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pageObjects/ButtonsPage';

test.describe('🖱️ Buttons Page', () => {
  async function navigateToButtonsPage(page): Promise<ButtonsPage> {
    return await test.step('🌐 Navigate to Buttons page', async () => {
      const buttonsPage = new ButtonsPage(page);
      await buttonsPage.goto.random();
      return buttonsPage;
    });
  }

  test('🖱️ Double click button shows correct message', { tag: '@sanity' }, async ({ page }) => {
    const buttonsPage = await navigateToButtonsPage(page);

    await test.step('🖱️ Perform double click', async () => {
      await buttonsPage.doubleClick();
    });

    await test.step('✅ Verify double click message', async () => {
      const msg = await buttonsPage.getDoubleClickMessage();
      expect(msg).toContain('You have done a double click');
    });
  });

  test('🖱️ Right click button shows correct message', async ({ page }) => {
    const buttonsPage = await navigateToButtonsPage(page);

    await test.step('🖱️ Perform right click', async () => {
      await buttonsPage.rightClick();
    });

    await test.step('✅ Verify right click message', async () => {
      const msg = await buttonsPage.getRightClickMessage();
      expect(msg).toContain('You have done a right click');
    });
  });

  test('🖱️ Dynamic click button shows correct message', async ({ page }) => {
    const buttonsPage = await navigateToButtonsPage(page);

    await test.step('🖱️ Perform dynamic click', async () => {
      await buttonsPage.dynamicClick();
    });

    await test.step('✅ Verify dynamic click message', async () => {
      const msg = await buttonsPage.getDynamicClickMessage();
      expect(msg).toContain('You have done a dynamic click');
    });
  });
});
