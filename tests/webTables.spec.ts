// tests/webTables.spec.ts
import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pageObjects/WebTablesPage';
import { generateFakeTableUser } from '../utils/fakeTableUser';

test.describe('📊 Web Tables', () => {
  test('✅ Add new user to table and validate entry', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    const user = generateFakeTableUser();

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('➕ Add new user', async () => {
      await webTablesPage.addUser(user);
    });

    await test.step('🔍 Search for new user and verify result', async () => {
      await webTablesPage.search(user.firstName);
      const rowCount = await webTablesPage.getVisibleRowCount();
      expect(rowCount).toBeGreaterThan(0);
    });
  });

  test('🔍 Search for user and verify result', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('🔍 Search for known user "Cierra"', async () => {
      await webTablesPage.search('Cierra');
      const rowCount = await webTablesPage.getVisibleRowCount();
      expect(rowCount).toBeGreaterThan(0);
    });
  });

  test('❌ Delete user from table and verify removal', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    const user = generateFakeTableUser();

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('➕ Add user and delete after search', async () => {
      await webTablesPage.addUser(user);
      await webTablesPage.search(user.firstName);
      await webTablesPage.deleteUserByName(user.firstName);
    });

    await test.step('🔍 Confirm user is no longer present', async () => {
      await webTablesPage.search(user.firstName);
      const rowCount = await webTablesPage.getFilledRowCount();
      expect(rowCount).toBe(0);
    });
  });

  test('📄 Pagination shows correct number of rows per page', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('🔢 Set pagination to 5 and validate', async () => {
      await webTablesPage.setPaginationSize('5');
      const count5 = await webTablesPage.getVisibleRowCount();
      expect(count5).toBeLessThanOrEqual(5);
    });

    await test.step('🔢 Set pagination to 10 and validate', async () => {
      await webTablesPage.setPaginationSize('10');
      const count10 = await webTablesPage.getVisibleRowCount();
      expect(count10).toBeLessThanOrEqual(10);
    });
  });

  test('✏️ Edit user and validate updated info', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    const user = generateFakeTableUser();
    const updated = generateFakeTableUser();

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('➕ Add user and update with new info', async () => {
      await webTablesPage.addUser(user);
      await webTablesPage.search(user.firstName);
      await webTablesPage.editUserByName(user.firstName, updated);
    });

    await test.step('🔍 Search for updated user and validate', async () => {
      await webTablesPage.search(updated.firstName);
      const rowCount = await webTablesPage.getVisibleRowCount();
      expect(rowCount).toBeGreaterThan(0);
    });
  });

  test('📧 Validate all emails in Email column are valid', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('✅ Check email column format for each row', async () => {
      const emails = await webTablesPage.getColumnValues(3); // Email is 4th column
      for (const email of emails) {
        expect(email).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
      }
    });
  });

  test('🔃 Sort table by First Name and verify order', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);

    await test.step('📄 Navigate to Web Tables page', async () => {
      await webTablesPage.goto();
    });

    await test.step('⬆️ Sort by First Name and verify ascending order', async () => {
      await webTablesPage.clickColumnHeader('First Name');
      const values = await webTablesPage.getColumnValues(0); // First column
      const sorted = [...values].sort((a, b) => a.localeCompare(b));
      expect(values).toEqual(sorted);
    });
  });
});
