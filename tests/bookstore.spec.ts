// tests/bookstore.spec.ts
import { test, expect } from '@playwright/test';
import { BookstorePage } from '../pageObjects/BookstorePage';
import { bookData } from '../data/bookData';

test.describe('📚 Bookstore Search Scenarios', () => {
  async function navigateToBookstore(page): Promise<BookstorePage> {
    return await test.step('🌐 Navigate to Bookstore page', async () => {
      const bookstore = new BookstorePage(page);
      await bookstore.goto();
      return bookstore;
    });
  }

  for (const { dataname, booktype, bookname, booksearch } of bookData) {
    test(`🔍 Search scenario: ${dataname}`, async ({ page }) => {
      const bookstore = await navigateToBookstore(page);

      await test.step(`🔎 Search for "${booksearch}"`, async () => {
        await bookstore.searchBook(booksearch);
      });

      if (booktype === 'expected') {
        await test.step(`✅ Expect book "${bookname}" to be visible`, async () => {
          await bookstore.expectBookToBeVisible(bookname);
        });
      } else {
        await test.step('❌ Expect no results to be found', async () => {
          await bookstore.expectNoResults();
        });
      }
    });
  }
});
