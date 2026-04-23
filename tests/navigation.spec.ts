// tests/navigation.spec.ts
import { Page, test } from '@playwright/test';
import { sections, type NavigationPageObjectClass } from '../data/navigationSections';

type NavigationMethod = 'viaMenu' | 'viaDirectLink';

async function navigateTo(
  page: Page,
  pageObjectClass: NavigationPageObjectClass,
  method: NavigationMethod
) {
  const instance = new pageObjectClass(page);

  await test.step(`Navigate ${method === 'viaMenu' ? 'via sidebar menu' : 'via direct URL'}`, async () => {
    await instance.goto[method]();
  });

  await test.step('Assert correct page loaded', async () => {
    await instance.assertOnPage();
  });
}

const strategies = [
  { name: 'via menu', method: 'viaMenu' as const },
  { name: 'via direct link', method: 'viaDirectLink' as const },
];

for (const strategy of strategies) {
  test.describe(`Navigation (${strategy.name})`, () => {
    for (const [sectionIndex, section] of sections.entries()) {
      test.describe(`${section.name}`, () => {
        for (const [subPageIndex, subPage] of section.subPages.entries()) {
          const isSanityExample = strategy.method === 'viaMenu' && sectionIndex === 0 && subPageIndex === 0;
          test(`${section.name} -> ${subPage.name}`, isSanityExample ? { tag: '@sanity' } : {}, async ({ page }) => {
            await navigateTo(page, subPage.page ?? section.page, strategy.method);
          });
        }
      });
    }
  });
}
