// tests/register.spec.ts
import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../pageObjects/RegisterPage';

function generateUser(overrides = {}) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const password = faker.internet.password();

  return {
    firstName,
    lastName,
    username,
    password,
    ...overrides
  };
}

test.describe('Bookstore Registration Scenarios', () => {
  test('✅ Valid user registration (captcha expected)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser();

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    await registerPage.expectSuccessOrCaptcha();
  });

  test('❌ Invalid registration: missing first name', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ firstName: '' });

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    await registerPage.expectFieldInvalid('#firstname');
  });

  test('❌ Invalid registration: missing last name', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ lastName: '' });

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    await registerPage.expectFieldInvalid('#lastname');
  });

  test('❌ Invalid registration: missing username', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ username: '' });

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    await registerPage.expectFieldInvalid('#userName');
  });

  test('❌ Invalid registration: missing password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ password: '' });

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    await registerPage.expectFieldInvalid('#password');
  });  

});