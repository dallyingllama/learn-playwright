// tests/webTables.spec.ts
import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pageObjects/WebTablesPage';
import { generateFakeTableUser } from '../utils/fakeTableUser';

test.describe('📊 Web Tables', () => {
  test('✅ Add new user to table and validate entry', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();

    const user = generateFakeTableUser();
    await webTablesPage.addUser(user);

    await webTablesPage.search(user.firstName);
    const rowCount = await webTablesPage.getVisibleRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('🔍 Search for user and verify result', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();

    await webTablesPage.search('Cierra'); // Known seed data
    const rowCount = await webTablesPage.getVisibleRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('❌ Delete user from table and verify removal', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();

    const user = generateFakeTableUser();
    await webTablesPage.addUser(user);
    await webTablesPage.search(user.firstName);
    await webTablesPage.deleteUserByName(user.firstName);

    // Confirm deletion
    await webTablesPage.search(user.firstName);
    const rowCount = await webTablesPage.getFilledRowCount();
    expect(rowCount).toBe(0);
  });

  test('📄 Pagination shows correct number of rows per page', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();

    await webTablesPage.setPaginationSize('5');
    const count5 = await webTablesPage.getVisibleRowCount();
    expect(count5).toBeLessThanOrEqual(5);

    await webTablesPage.setPaginationSize('10');
    const count10 = await webTablesPage.getVisibleRowCount();
    expect(count10).toBeLessThanOrEqual(10);
  });

  test('✏️ Edit user and validate updated info', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();

    const user = generateFakeTableUser();
    await webTablesPage.addUser(user);

    const updated = generateFakeTableUser();
    await webTablesPage.search(user.firstName);
    await webTablesPage.editUserByName(user.firstName, updated);

    await webTablesPage.search(updated.firstName);
    const rowCount = await webTablesPage.getVisibleRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });
  
  test('📧 Validate all emails in Email column are valid', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();
    const emails = await webTablesPage.getColumnValues(3); // Email is 4th column
    for (const email of emails) {
      expect(email).toMatch(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    }
  });

  test('🔃 Sort table by First Name and verify order', async ({ page }) => {
    const webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();
    await webTablesPage.clickColumnHeader('First Name');
    const values = await webTablesPage.getColumnValues(0); // First column
    const sorted = [...values].sort((a, b) => a.localeCompare(b));
    expect(values).toEqual(sorted);
  });
});
