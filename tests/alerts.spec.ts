// tests/alerts.spec.ts
import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pageObjects/AlertsPage';

test.describe('🔔 Alerts and Windows Tests', { tag: '@sanity' }, () => {
  async function navigateToAlertsPage(page) {
    await test.step('🌐 Navigate to Alerts page', async () => {
      const alertsPage = new AlertsPage(page);
      await alertsPage.goto();
      await alertsPage.waitForPageReady();
    });
  }

  test('🔘 should display an alert when alert button is clicked', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('⚠️ Trigger alert and validate message', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('You clicked a button');
        await dialog.accept();
      });

      await alertsPage.alertButton.click();
      await page.waitForTimeout(500);
    });
  });

  test('⏱️ should display a timed alert when time is up', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('⏳ Trigger timed alert and validate message', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('This alert appeared after 5 seconds');
        await dialog.accept();
      });

      await alertsPage.timerAlertButton.click();
      await page.waitForTimeout(500);
    });
  });

  test('✅ should display a confirmation alert and accept it', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('📝 Trigger confirm alert and accept', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Do you confirm action?');
        await dialog.accept();
      });

      await alertsPage.confirmButton.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('You selected Ok')).toBeVisible();
    });
  });

  test('🧾 should display a prompt alert and enter text', async ({ page }) => {
    await navigateToAlertsPage(page);
    const alertsPage = new AlertsPage(page);

    await test.step('📥 Trigger prompt and submit value', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name');
        await dialog.accept('John Doe');
      });

      await alertsPage.promptButton.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('You entered John Doe')).toBeVisible();
    });
  });
});
