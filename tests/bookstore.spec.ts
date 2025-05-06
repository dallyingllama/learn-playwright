import { test, expect } from '@playwright/test';
import { BookstorePage } from '../pageObjects/BookstorePage';
import { bookData } from '../data/bookData';

test.describe('📚 Bookstore Search Scenarios', () => {
  for (const { dataname, booktype, bookname, booksearch } of bookData) {
    test(`Search scenario: ${dataname}`, async ({ page }) => {
      const bookstore = new BookstorePage(page);
      await bookstore.goto();
      await bookstore.searchBook(booksearch);

      if (booktype === 'expected') {
        await bookstore.expectBookToBeVisible(bookname);
      } else {
        await bookstore.expectNoResults();
      }
    });
  }
});
