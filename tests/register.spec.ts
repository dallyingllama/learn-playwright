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

test.describe('📚 Bookstore Registration Scenarios', () => {
  test('✅ Valid user registration (captcha expected)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser();

    await test.step('📄 Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('📝 Fill out and submit registration form', async () => {
      await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    });

    await test.step('✅ Expect success or captcha prompt', async () => {
      await registerPage.expectSuccessOrCaptcha();
    });
  });

  test('❌ Invalid registration: missing first name', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ firstName: '' });

    await test.step('📄 Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('🚫 Submit form with missing first name', async () => {
      await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    });

    await test.step('🔍 Expect first name field validation error', async () => {
      await registerPage.expectFieldInvalid('#firstname');
    });
  });

  test('❌ Invalid registration: missing last name', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ lastName: '' });

    await test.step('📄 Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('🚫 Submit form with missing last name', async () => {
      await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    });

    await test.step('🔍 Expect last name field validation error', async () => {
      await registerPage.expectFieldInvalid('#lastname');
    });
  });

  test('❌ Invalid registration: missing username', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ username: '' });

    await test.step('📄 Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('🚫 Submit form with missing username', async () => {
      await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    });

    await test.step('🔍 Expect username field validation error', async () => {
      await registerPage.expectFieldInvalid('#userName');
    });
  });

  test('❌ Invalid registration: missing password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser({ password: '' });

    await test.step('📄 Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('🚫 Submit form with missing password', async () => {
      await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    });

    await test.step('🔍 Expect password field validation error', async () => {
      await registerPage.expectFieldInvalid('#password');
    });
  });
});
