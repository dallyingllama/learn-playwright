// tests/navigation.spec.ts
import { test } from '@playwright/test';
import { sections } from '../data/navigationSections'; // 💡 moved to external file for readability (optional)

type NavigationMethod = 'viaMenu' | 'viaDirectLink';

async function navigateTo(page, pageObjectClass: any, method: NavigationMethod) {
  const instance = new pageObjectClass(page);

  await test.step(`📄 Navigate ${method === 'viaMenu' ? 'via sidebar menu' : 'via direct URL'}`, async () => {
    await instance.goto[method]();
  });

  await test.step('🔎 Assert correct page loaded', async () => {
    await instance.assertOnPage();
  });
}

const strategies = [
  { name: 'via menu', method: 'viaMenu' as const },
  { name: 'via direct link', method: 'viaDirectLink' as const },
];

for (const strategy of strategies) {
  test.describe(`📚✅ Navigation (${strategy.name})`, { tag: '@sanity' }, () => {
    for (const section of sections) {
      test.describe(`${section.name}`, () => {
        for (const subPage of section.subPages) {
          test(`➡️ ${section.name} → ${subPage.name}`, async ({ page }) => {
            await navigateTo(page, subPage.page ?? section.page, strategy.method);
          });
        }
      });
    }
  });
}
