import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';
import { RegisterPage } from '../page-objects/register-page';

type RegisterUser = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

function generateUser(overrides: Partial<RegisterUser> = {}): RegisterUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const password = faker.internet.password();

  return {
    firstName,
    lastName,
    username,
    password,
    ...overrides,
  };
}

test.describe('Bookstore Registration Scenarios', () => {
  test('Valid user registration (captcha expected)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser();

    await test.step('Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await test.step('Fill out and submit registration form', async () => {
      await registerPage.register(user.firstName, user.lastName, user.username, user.password);
    });

    await test.step('Expect success or captcha prompt', async () => {
      await registerPage.expectSuccessOrCaptcha();
    });
  });

  const invalidRegistrationCases: Array<{
    dataname: string;
    invalidFieldSelector: string;
    overrides: Partial<RegisterUser>;
  }> = [
    {
      dataname: 'Invalid registration: missing first name',
      invalidFieldSelector: '#firstname',
      overrides: { firstName: '' },
    },
    {
      dataname: 'Invalid registration: missing last name',
      invalidFieldSelector: '#lastname',
      overrides: { lastName: '' },
    },
    {
      dataname: 'Invalid registration: missing username',
      invalidFieldSelector: '#userName',
      overrides: { username: '' },
    },
    {
      dataname: 'Invalid registration: missing password',
      invalidFieldSelector: '#password',
      overrides: { password: '' },
    },
  ];

  for (const [index, scenario] of invalidRegistrationCases.entries()) {
    test(scenario.dataname, index === 0 ? { tag: '@sanity' } : {}, async ({ page }) => {
      const registerPage = new RegisterPage(page);
      const user = generateUser(scenario.overrides);

      await test.step('Navigate to registration page', async () => {
        await registerPage.goto();
      });

      await test.step(`Submit form with ${scenario.dataname.replace('Invalid registration: ', '')}`, async () => {
        await registerPage.register(user.firstName, user.lastName, user.username, user.password);
      });

      await test.step('Expect field validation error', async () => {
        await registerPage.expectFieldInvalid(scenario.invalidFieldSelector);
      });
    });
  }
});
