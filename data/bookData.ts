export type BookExpectation = 'expected' | 'not expected';

export interface BookDataEntry {
  dataname: string;
  booktype: BookExpectation;
  bookname: string;
  booksearch: string;
}

export const bookData: BookDataEntry[] = [
  {
    dataname: 'existing book by partial title',
    booktype: 'expected',
    bookname: 'Git Pocket Guide',
    booksearch: 'Git'
  },
  {
    dataname: 'existing book by full title',
    booktype: 'expected',
    bookname: 'Learning JavaScript Design Patterns',
    booksearch: 'Learning JavaScript Design Patterns'
  },
  {
    dataname: 'nonexistent book',
    booktype: 'not expected',
    bookname: '',
    booksearch: 'Nonexistent Book Title'
  }
];
