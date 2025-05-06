// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { ElementsPage } from '../pageObjects/ElementsPage';
import { FormPage } from '../pageObjects/FormPage';
import { AlertsWindowsPage } from '../pageObjects/AlertsWindowsPage';
import { WidgetsPage } from '../pageObjects/WidgetsPage';
import { InteractionsPage } from '../pageObjects/InteractionsPage';
import { BookstorePage } from '../pageObjects/BookstorePage';

const targetText = 'Please select an item from left to start practice.';
const loginButtonText = 'Login';

const sections = [
  {
    name: 'Elements',
    urlPart: '/elements',
    page: ElementsPage,
    subPages: [
      { name: 'Text Box', urlPart: '/text-box' },
      { name: 'Check Box', urlPart: '/checkbox' },
      { name: 'Radio Button', urlPart: '/radio-button' },
      { name: 'Web Tables', urlPart: '/webtables' },
      { name: 'Buttons', urlPart: '/buttons' },
      { name: 'Links', urlPart: '/links' },
      { name: 'Broken Links - Images', urlPart: '/broken' },
      { name: 'Upload and Download', urlPart: '/upload-download' },
      { name: 'Dynamic Properties', urlPart: '/dynamic-properties' },
    ],
  },
  {
    name: 'Forms',
    urlPart: '/forms',
    page: FormPage,
    subPages: [
      { name: 'Practice Form', urlPart: '/automation-practice-form' },
    ],
  },
  {
    name: 'Alerts, Frame & Windows',
    urlPart: '/alertsWindows',
    page: AlertsWindowsPage,
    subPages: [
      { name: 'Browser Windows', urlPart: '/browser-windows' },
      { name: 'Alerts', urlPart: '/alerts' },
      { name: 'Frames', urlPart: '/frames' },
      { name: 'Nested Frames', urlPart: '/nestedframes' },
      { name: 'Modal Dialogs', urlPart: '/modal-dialogs' },
    ],
  },
  {
    name: 'Widgets',
    urlPart: '/widgets',
    page: WidgetsPage,
    subPages: [
      { name: 'Accordian', urlPart: '/accordian' },
      { name: 'Auto Complete', urlPart: '/auto-complete' },
      { name: 'Date Picker', urlPart: '/date-picker' },
      { name: 'Slider', urlPart: '/slider' },
      { name: 'Progress Bar', urlPart: '/progress-bar' },
      { name: 'Tabs', urlPart: '/tabs' },
      { name: 'Tool Tips', urlPart: '/tool-tips' },
      { name: 'Menu', urlPart: '/menu' },
      { name: 'Select Menu', urlPart: '/select-menu' },
    ],
  },
  {
    name: 'Interactions',
    urlPart: '/interaction',
    page: InteractionsPage,
    subPages: [
      { name: 'Sortable', urlPart: '/sortable' },
      { name: 'Selectable', urlPart: '/selectable' },
      { name: 'Resizable', urlPart: '/resizable' },
      { name: 'Droppable', urlPart: '/droppable' },
      { name: 'Dragabble', urlPart: '/dragabble' },
    ],
  },
  {
    name: 'Book Store Application',
    urlPart: '/books',
    page: BookstorePage,
    subPages: [
      { name: 'Login', urlPart: '/login' },
      { name: 'Book Store', urlPart: '/books' },
      { name: 'Profile', urlPart: '/profile' },
      { name: 'Book Store API', urlPart: '/swagger' }, 
    ],
  },
];
// Create test for each navigation strategy
const strategies = [
  { name: 'via menu', method: 'viaMenu' as const },
  { name: 'via direct link', method: 'viaDirectLink' as const },
];

// Top-level card navigation
for (const strategy of strategies) {
  test.describe(`🏠✅ Home Card Navigation (${strategy.name})`, { tag: '@sanity' }, () => {
    for (const section of sections) {
      test(`Navigate to ${section.name}`, async ({ page }) => {
        const home = new HomePage(page);
        await home.goto[strategy.method]();
        await home.clickCard(section.name);
        await expect(page).toHaveURL(new RegExp(section.urlPart));

        if (section.name === 'Book Store Application') {
          await expect(page.getByRole('button', { name: loginButtonText })).toBeVisible();
        } else {
          await expect(page.getByText(targetText)).toBeVisible();
        }
      });
    }
  });
}

// Sidebar subpage navigation
for (const strategy of strategies) {
  test.describe(`📚✅ Sidebar Sub-Page Navigation (${strategy.name})`, { tag: '@sanity' }, () => {
    for (const section of sections) {
      test.describe(`${section.name}`, () => {
        for (const subPage of section.subPages) {
          test(`➡️ Navigate to ${subPage.name}`, async ({ page }) => {
            const home = new HomePage(page);
            await home.goto[strategy.method]();
            await home.clickCard(section.name);
            await expect(page).toHaveURL(new RegExp(section.urlPart));

            const sectionPage = new section.page(page);
            await sectionPage.sidebarMenu.navigateTo(subPage.name);
            await expect(page).toHaveURL(new RegExp(subPage.urlPart));
          });
        }
      });
    }
  });
}