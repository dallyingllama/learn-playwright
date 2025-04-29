import { test, expect } from '@playwright/test'
import { LoginPage } from '../pageObjects/LoginPage';
import { loginData } from '../data/loginData';
import { checkForBlankCredentials } from '../utils/annotations';

test.describe('Login Scenarios using the POM & data driven', () => {
  for (const { dataname, username, password } of loginData) {
    test(`Login test for Scenario: ${dataname}`, async ({ page }, testInfo) => {
      checkForBlankCredentials(username, password, testInfo);
      const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.login(username, password);
        switch (dataname) {
          case "valid":
            await loginPage.loginSuccessful();
            break;
          case "locked":
          case "invalid username": 
          case "invalid password'":
            await loginPage.loginFailed();
            break;
          case "empty username":
          case "empty password":
          case "empty fields":
            await loginPage.loginWithEmptyFields();
            break;
          case "long username":
          case "long password":
            await loginPage.loginWithLongCredentials();
            break;
          default: 
              break;
       }

    });
  }
}); 