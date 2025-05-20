// pageObjects/WebTablesPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { createGotoWithVariants } from '../utils/gotoHelper';
import { NavigablePage } from './interfaces/NavigablePage';

const config = {
  menu: 'Elements',
  menuItem: 'Web Tables',
  url: '/webtables',
  header: 'Web Tables',
};

export class WebTablesPage extends BasePage implements NavigablePage {
  readonly goto;
  constructor(page: Page) {
    super(page);
    this.goto = createGotoWithVariants(
      async () => {
        await this.openSidebarFromHome(config.menu);
        await this.sidebarMenu.navigateTo(config.menuItem);
        await this.waitForPageReady();
      },
      async () => {
        await this.page.goto(config.url);
        await this.waitForPageReady();
      }
    );
  }

  override async waitForPageReady(): Promise<void> {
    await expect(this.page.locator('h1')).toHaveText(config.header);
  }

  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(config.url);
    await expect(this.page.locator('h1')).toHaveText(config.header);
  }    

  // Locators
  private addButton = this.page.getByRole('button', { name: 'Add' });
  private firstNameInput = this.page.locator('#firstName');
  private lastNameInput = this.page.locator('#lastName');
  private emailInput = this.page.locator('#userEmail');
  private ageInput = this.page.locator('#age');
  private salaryInput = this.page.locator('#salary');
  private departmentInput = this.page.locator('#department');
  private submitButton = this.page.locator('#submit');
  private searchBox = this.page.locator('#searchBox');
  private tableRows = this.page.locator('.rt-tbody .rt-tr-group');
  private paginationSelect = this.page.locator('select[aria-label="rows per page"]');

  // Add user to table
  async addUser(user: Record<string, string>) {
    await this.addButton.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.ageInput.fill(user.age);
    await this.salaryInput.fill(user.salary);
    await this.departmentInput.fill(user.department);
    await this.submitButton.click();
  }

  // Search by keyword
  async search(keyword: string) {
    await this.searchBox.fill(keyword);
  }

  // Delete user by name
  async deleteUserByName(name: string) {
    const row = this.page.locator('.rt-tr-group', { hasText: name });
    const deleteBtn = row.locator('[title="Delete"]');
    await deleteBtn.click();
  }

  // Count visible rows
  async getVisibleRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getFilledRowCount(): Promise<number> {
    const rows = this.page.locator('.rt-tbody .rt-tr-group');
    const count = await rows.count();
    let filled = 0;
  
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const textContent = await row.textContent();
      if (textContent && textContent.trim().length > 0) {
        filled++;
      }
    }
  
    return filled;
  }

  async getRowData(): Promise<string[]> {
    const rows = this.page.locator('.rt-tbody .rt-tr-group');
    const count = await rows.count();
    const data = [];
  
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const text = await row.textContent();
      if (text && text.trim()) {
        data.push(text.trim());
      }
    }
  
    return data;
  }

  async editUserByName(name: string, updated: Record<string, string>) {
    const row = this.page.locator('.rt-tr-group', { hasText: name });
    const editBtn = row.locator('[title="Edit"]');
    await editBtn.click();
  
    await this.firstNameInput.fill(updated.firstName);
    await this.lastNameInput.fill(updated.lastName);
    await this.emailInput.fill(updated.email);
    await this.ageInput.fill(updated.age);
    await this.salaryInput.fill(updated.salary);
    await this.departmentInput.fill(updated.department);
    await this.submitButton.click();
  }

  // Select pagination size
  async setPaginationSize(size: string) {
    await this.paginationSelect.selectOption(size);
  }
  async clickColumnHeader(columnText: string) {
    const header = this.page.locator('.rt-th').filter({ hasText: columnText });
    await header.click();
  }
  
  async getColumnValues(index: number): Promise<string[]> {
    const rows = this.page.locator('.rt-tbody .rt-tr-group');
    const values: string[] = [];
  
    for (let i = 0; i < await rows.count(); i++) {
      const cells = rows.nth(i).locator('.rt-td');
      const cellText = await cells.nth(index).textContent();
      if (cellText && cellText.trim()) {
        values.push(cellText.trim());
      }
    }
  
    return values;
  }
  
  
}
