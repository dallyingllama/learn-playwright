// tests/buttons.spec.ts
import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pageObjects/ButtonsPage';

test.describe('🖱️ Buttons Page', () => {
  test('🖱️ Double click button shows correct message', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);
    await buttonsPage.goto();

    await buttonsPage.doubleClick();
    const msg = await buttonsPage.getDoubleClickMessage();
    expect(msg).toContain('You have done a double click');
  });

  test('🖱️ Right click button shows correct message', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);
    await buttonsPage.goto();

    await buttonsPage.rightClick();
    const msg = await buttonsPage.getRightClickMessage();
    expect(msg).toContain('You have done a right click');
  });

  test('🖱️ Dynamic click button shows correct message', async ({ page }) => {
    const buttonsPage = new ButtonsPage(page);
    await buttonsPage.goto();

    await buttonsPage.dynamicClick();
    const msg = await buttonsPage.getDynamicClickMessage();
    expect(msg).toContain('You have done a dynamic click');
  });
});
