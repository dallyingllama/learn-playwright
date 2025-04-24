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


test.describe('Login Scenarios using the POM)', () => {

  test('Standard user can login successfully', { tag: ['@learn', '@fun' ] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.loginSuccessful();
  })
  
  test('locked out user cannot login', { tag: ['@learn', '@fun' ] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.loginFailed();
  })

  test('invalid user cannot login', { tag: ['@learn', '@fun' ] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('invalid_user', 'secret_sauce');
    await loginPage.loginFailed();
  })

  test('invalid password cannot login', { tag: ['@learn', '@fun' ] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login('standard_user', 'wrong_pass');
    await loginPage.loginFailed();
  })
});




/* test('Successful login', { tag: ['@learn', '@fun' ] }, async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/.*inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
}); */