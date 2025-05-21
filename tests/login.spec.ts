// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { loginData } from '../data/loginData';

const validLogins = loginData.filter(data => data.logintype === 'valid');
const invalidLogins = loginData.filter(data => data.logintype === 'invalid');

async function openLogin(page): Promise<LoginPage> {
  return await test.step('📄 Navigate to Login Page', async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.waitForLoginForm(); // robustness
    return loginPage;
  });
}

test.describe('🔐✅ Valid Login Scenarios', () => {
  for (const { dataname, username, password } of validLogins) {
    test(`✅ ${dataname}`, async ({ page }) => {
      const loginPage = await openLogin(page);

      await test.step(`🔓 Login with valid credentials (${username})`, async () => {
        await loginPage.login(username, password);
        await loginPage.expectSuccessfulLogin();
      });
    });
  }
});

test.describe('🔐🚫 Invalid Login Scenarios', () => {
  for (const { dataname, username, password } of invalidLogins) {
    test(`❌ ${dataname}`, async ({ page }) => {
      const loginPage = await openLogin(page);

      await test.step(`🔐 Attempt login with invalid credentials (u: "${username}", p: "${password}")`, async () => {
        await loginPage.login(username, password);

        if (username && password) {
          await loginPage.expectFailedLogin();
        } else if (!username) {
          await loginPage.expectFieldInvalid('#userName');
        } else if (!password) {
          await loginPage.expectFieldInvalid('#password');
        }
      });
    });
  }
});
