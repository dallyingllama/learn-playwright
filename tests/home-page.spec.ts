import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/home-page';
import { sectionMetadata, SECTION_KEYS_ORDER, SECTION_LANDING_MESSAGE } from '../page-objects/metadata/section-metadata';

test.describe('Home Page Tests', () => {
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
      for (const sectionKey of SECTION_KEYS_ORDER) {
        await expect(categoryCards.getByRole('link', { name: sectionMetadata[sectionKey].name, exact: true })).toBeVisible();
      }
    });
  });

  test('Each homepage card opens the expected section', async ({ page }) => {
    const homePage = await navigateToHomePage(page);

    for (const sectionKey of SECTION_KEYS_ORDER) {
      const metadata = sectionMetadata[sectionKey];

      await test.step(`Open ${metadata.name} card`, async () => {
        await homePage.goto();
        await homePage.clickCard(metadata.name);
      });

      await test.step(`Verify ${metadata.name} section page is loaded`, async () => {
        await expect(page).toHaveURL(new RegExp(`/${metadata.url}$`));

        if (metadata.landingType === 'sectionLanding') {
          await expect(page.getByText(SECTION_LANDING_MESSAGE)).toBeVisible();
          return;
        }

        await expect(page.locator('#searchBox')).toBeVisible();
      });
    }
  });
});
