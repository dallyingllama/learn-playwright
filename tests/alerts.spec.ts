import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pageObjects/AlertsPage';

test.describe('Alerts and Windows Tests', () => {
  let alertsPage: AlertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.goto(); 
    await alertsPage.waitForPageReady()
  });

  test('should display an alert when alert button is clicked', async () => {
    const page = alertsPage.getPage();
  
    // Register dialog event handler BEFORE clicking
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('You clicked a button');
      await dialog.accept();
    });
  
    // Trigger alert
    await alertsPage.alertButton.click();
  
    // Optionally wait a moment to ensure handler processed dialog
    await page.waitForTimeout(500);
  });

  test('should display an alert when alert button is clicked and time is up', async () => {
    const page = alertsPage.getPage();
  
    // Register dialog event handler BEFORE clicking
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('You clicked a button');
      await dialog.accept();
    });
  
    // Trigger alert
    await alertsPage.timerAlertButton.click();
  
    // Optionally wait a moment to ensure handler processed dialog
    await page.waitForTimeout(500);
  });

  test('should display a confirmation alert and accept it', async () => {
    const page = alertsPage.getPage();
  
    // Register dialog event handler BEFORE clicking
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Do you confirm action?');
      await dialog.accept();
    });
  
    // Trigger alert
    await alertsPage.confirmButton.click();
  
    // Optionally wait a moment to ensure handler processed dialog
    await page.waitForTimeout(500);

    // Verify message 
    await expect(page.getByText('You selected Ok')).toBeVisible();
    
  });

  test('should display a prompt alert and enter text', async () => {
    const page = alertsPage.getPage();
  
    // Register dialog event handler BEFORE clicking
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('Please enter your name');
      await dialog.accept('John Doe');
    });
  
    // Trigger alert
    await alertsPage.promptButton.click();
  
    // Optionally wait a moment to ensure handler processed dialog
    await page.waitForTimeout(500);

    // Verify the entered text
    await expect(page.getByText('You entered John Doe')).toBeVisible();
  });
});
