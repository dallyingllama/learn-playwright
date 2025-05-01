import { test, expect } from '@playwright/test';
import { generateFakeUser } from '../utils/fakeUser';

test('fill out demo registration form with fake user', async ({ page }) => {
  const user = generateFakeUser();

  await page.goto('https://demoqa.com/automation-practice-form');

  // Remove ads/footers that may block clicks
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, .footer')?.forEach(el => el.remove());
  });

  await page.getByPlaceholder('First Name').fill(user.fullName.split(' ')[0]);
  await page.getByPlaceholder('Last Name').fill(user.fullName.split(' ')[1]);
  await page.getByPlaceholder('name@example.com').fill(user.email);
  //await page.getByLabel('Gender').click(); // Select first gender option
  await page.getByText('Male', { exact: true }).check();
  await page.getByPlaceholder('Mobile Number').fill('1234567890');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Confirmation modal should appear
  await expect(page.getByText('Thanks for submitting the form')).toBeVisible();

  // click ok to close confirmation modal
  await page.getByRole('button', { name: 'Close' }).click();
});
