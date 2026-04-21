// tests/alerts.spec.ts
import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pageObjects/AlertsPage';

test.describe('🔔 Alerts and Windows Tests', () => {
  async function navigateToAlertsPage(page) {
    await test.step('🌐 Navigate to Alerts page', async () => {
      const alertsPage = new AlertsPage(page);
      await alertsPage.goto.random();
      await alertsPage.waitForPageReady();
    });
  }

  test('🔘 should display an alert when alert button is clicked', { tag: '@sanity' }, async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('⚠️ Trigger alert and validate message', async () => {
      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('You clicked a button');
        await dialog.accept();
      });

      await alertsPage.alertButton.click();
    });
  });

  test('⏱️ should display a timed alert when time is up', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('⏳ Trigger timed alert and validate message', async () => {
      let dialogSeen = false;
      const startTime = Date.now();

      page.once('dialog', async (dialog) => {
        dialogSeen = true;
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('This alert appeared after 5 seconds');
        await dialog.accept();
      });

      await alertsPage.timerAlertButton.click();

      // Intentional timing assertion: this test proves the alert does not appear immediately.
      await page.waitForTimeout(3000);
      expect(dialogSeen).toBe(false);

      await expect
        .poll(() => dialogSeen, {
          timeout: 3000,
          message: 'Expected timed alert to appear after the 5 second delay',
        })
        .toBe(true);

      expect(Date.now() - startTime).toBeGreaterThanOrEqual(4500);
    });
  });

  test('✅ should display a confirmation alert and accept it', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('📝 Trigger confirm alert and accept', async () => {
      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Do you confirm action?');
        await dialog.accept();
      });

      await alertsPage.confirmButton.click();
      await expect(page.getByText('You selected Ok')).toBeVisible();
    });
  });

  test('🧾 should display a prompt alert and enter text', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('📥 Trigger prompt and submit value', async () => {
      page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name');
        await dialog.accept('John Doe');
      });

      await alertsPage.promptButton.click();
      await expect(page.getByText('You entered John Doe')).toBeVisible();
    });
  });
});
