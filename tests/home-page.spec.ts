import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/home-page';

test.describe('Home Page Tests', () => {
  const cards = [
    { name: 'Elements', urlPath: 'elements', readiness: 'sectionLanding' },
    { name: 'Forms', urlPath: 'forms', readiness: 'sectionLanding' },
    { name: 'Alerts, Frame & Windows', urlPath: 'alertsWindows', readiness: 'sectionLanding' },
    { name: 'Widgets', urlPath: 'widgets', readiness: 'sectionLanding' },
    { name: 'Interactions', urlPath: 'interaction', readiness: 'sectionLanding' },
    { name: 'Book Store Application', urlPath: 'books', readiness: 'bookStoreLanding' },
  ];

  async function navigateToHomePage(page): Promise<HomePage> {
    const homePage = new HomePage(page);
    await homePage.goto();
    return homePage;
  }

  test('Homepage loads and shows section cards', { tag: '@sanity' }, async ({ page }) => {
    const homePage = await navigateToHomePage(page);

    await test.step('Verify homepage is loaded', async () => {
      await homePage.assertOnPage();
    });

    await test.step('Verify section cards are visible', async () => {
      const categoryCards = page.locator('.category-cards');
      await expect(categoryCards.getByRole('link', { name: 'Elements', exact: true })).toBeVisible();
      await expect(categoryCards.getByRole('link', { name: 'Forms', exact: true })).toBeVisible();
      await expect(categoryCards.getByRole('link', { name: 'Alerts, Frame & Windows', exact: true })).toBeVisible();
      await expect(categoryCards.getByRole('link', { name: 'Widgets', exact: true })).toBeVisible();
      await expect(categoryCards.getByRole('link', { name: 'Interactions', exact: true })).toBeVisible();
      await expect(categoryCards.getByRole('link', { name: 'Book Store Application', exact: true })).toBeVisible();
    });
  });

  test('Each homepage card opens the expected section', async ({ page }) => {
    const homePage = await navigateToHomePage(page);

    for (const card of cards) {
      await test.step(`Open ${card.name} card`, async () => {
        await homePage.goto();
        await homePage.clickCard(card.name);
      });

      await test.step(`Verify ${card.name} section page is loaded`, async () => {
        await expect(page).toHaveURL(new RegExp(`/${card.urlPath}$`));

        if (card.readiness === 'sectionLanding') {
          await expect(page.getByText('Please select an item from left to start practice.')).toBeVisible();
          return;
        }

        await expect(page.locator('#searchBox')).toBeVisible();
      });
    }
  });
});
