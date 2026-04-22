// tests/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { loginData } from '../data/loginData';

const validLogins = loginData.filter((data) => data.logintype === 'valid');
const invalidLogins = loginData.filter((data) => data.logintype === 'invalid');

async function openLogin(page, method: 'default' | 'random' = 'default'): Promise<LoginPage> {
  return await test.step(`Navigate to Login Page (${method})`, async () => {
    const loginPage = new LoginPage(page);

    if (method === 'random') {
      await loginPage.goto.random();
    } else {
      await loginPage.goto();
    }

    await loginPage.waitForLoginForm();
    return loginPage;
  });
}

test.describe('Valid Login Scenarios', () => {
  for (const [index, { dataname, username, password }] of validLogins.entries()) {
    test(`${dataname}`, index === 0 ? { tag: '@sanity' } : {}, async ({ page }) => {
      const loginPage = await openLogin(page);

      await test.step(`Login with valid credentials (${username})`, async () => {
        await loginPage.login(username, password);
        await loginPage.expectSuccessfulLogin(username);
      });
    });
  }

  test('Randomized navigation still reaches the login page before valid login', async ({ page }) => {
    const { username, password } = validLogins[0];
    const loginPage = await openLogin(page, 'random');

    await test.step(`Login with valid credentials (${username}) after randomized navigation`, async () => {
      await loginPage.login(username, password);
      await loginPage.expectSuccessfulLogin(username);
    });
  });
});

test.describe('Invalid Login Scenarios', () => {
  for (const { dataname, username, password } of invalidLogins) {
    test(`${dataname}`, async ({ page }) => {
      const loginPage = await openLogin(page);

      await test.step(`Attempt login with invalid credentials (u: "${username}", p: "${password}")`, async () => {
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
