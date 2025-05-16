import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { loginData } from '../data/loginData';

const validLogins = loginData.filter(data => data.logintype === 'valid');
const invalidLogins = loginData.filter(data => data.logintype === 'invalid');

test.describe('🔐✅ Valid Login Scenarios', () => {
  for (const { dataname, username, password } of validLogins) {
    test(`✅ ${dataname}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(); // 👈 replaces openLoginPage()
      await loginPage.waitForLoginForm(); // 👍 optional but robust
      await loginPage.login(username, password);
      await loginPage.expectSuccessfulLogin();
    });
  }
});

test.describe('🔐🚫 Invalid Login Scenarios', () => {
  for (const { dataname, username, password } of invalidLogins) {
    test(`❌ ${dataname}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto(); // 👈 replaces openLoginPage()
      await loginPage.waitForLoginForm();
      await loginPage.login(username, password);

      if (username && password) {
        await loginPage.expectFailedLogin();
      } else if (!username) {
        await loginPage.expectFieldInvalid('#userName');
      } else if (!password) {
        await loginPage.expectFieldInvalid('#password');
      }
    });
  }
});
