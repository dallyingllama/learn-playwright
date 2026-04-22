// tests/webTables.spec.ts
import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../page-objects/web-tables-page';
import { generateFakeTableUser } from '../utils/fakeTableUser';

test.describe('📊 Web Tables', () => {
  test('✅ Add new user to table and validate entry', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    const user = generateFakeTableUser();

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto.random();
    });

    await test.step('➕ Add new user', async () => {
      await webTablesPage.addUser(user);
    });

    await test.step('🔍 Search for new user and verify result', async () => {
      await webTablesPage.search(user.firstName);
      await webTablesPage.expectMatchingRows(user.firstName);
    });
  });

  test('🔍 Search for user and verify result', { tag: '@sanity' }, async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto.random();
    });

    await test.step('🔍 Search for known user "Cierra"', async () => {
      await webTablesPage.search('Cierra');
      await webTablesPage.expectMatchingRows('Cierra');
    });
  });

  test('❌ Delete user from table and verify removal', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    const user = generateFakeTableUser();

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto.random();
    });

    await test.step('➕ Add user and delete after search', async () => {
      await webTablesPage.addUser(user);
      await webTablesPage.search(user.firstName);
      await webTablesPage.deleteUserByName(user.firstName);
    });

    await test.step('🔍 Confirm user is no longer present', async () => {
      await webTablesPage.search(user.firstName);
      await webTablesPage.expectNoMatchingRows(user.firstName);
    });
  });

  test('📄 Pagination shows correct number of rows per page', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto.random();
    });

    await test.step('🔢 Set pagination to 10 and validate', async () => {
      await webTablesPage.setPaginationSize('10');
      const count10 = await webTablesPage.getVisibleRowCount();
      expect(count10).toBeLessThanOrEqual(10);
    });

    await test.step('🔢 Set pagination to 20 and validate', async () => {
      await webTablesPage.setPaginationSize('20');
      const count20 = await webTablesPage.getVisibleRowCount();
      expect(count20).toBeLessThanOrEqual(20);
    });
  });

  test('✏️ Edit user and validate updated info', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    const user = generateFakeTableUser();
    const updated = generateFakeTableUser();

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto.random();
    });

    await test.step('➕ Add user and update with new info', async () => {
      await webTablesPage.addUser(user);
      await webTablesPage.search(user.firstName);
      await webTablesPage.editUserByName(user.firstName, updated);
    });

    await test.step('🔍 Search for updated user and validate', async () => {
      await webTablesPage.search(updated.firstName);
      await webTablesPage.expectMatchingRows(updated.firstName);
    });
  });

  test('📧 Validate all emails in Email column are valid', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto.random();
    });

    await test.step('✅ Check email column format for each row', async () => {
      const emails = await webTablesPage.getColumnValues(3); // Email is 4th column
      for (const email of emails) {
        expect(email).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
      }
    });
  });
});
