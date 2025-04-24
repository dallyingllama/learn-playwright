import { test, expect } from '@playwright/test'
import { LoginPage } from '../pageObjects/LoginPage';
import { loginData } from '../data/loginData';

test.describe('Login Scenarios using the POM & data driven', () => {
  for (const { dataname, username, password } of loginData) {
    test(`Login test for Scenario: ${dataname}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login(username, password);
        if (dataname === 'valid') {
          await loginPage.loginSuccessful();
        } else {
          await loginPage.loginFailed();
        }
    });
  }
}); 