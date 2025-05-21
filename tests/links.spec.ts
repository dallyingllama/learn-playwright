// tests/links.spec.ts
import { test, expect } from '@playwright/test';
import { LinksPage } from '../pageObjects/LinksPage';

test.describe('🔗 Links Page', () => {

  async function navigateToLinksPage(page): Promise<LinksPage> {
    return await test.step('🌐 Navigate to Links page', async () => {
      const linksPage = new LinksPage(page);
      await linksPage.goto();
      return linksPage;
    });
  }

  test('🧪 Clicking simple Home link opens demoqa.com homepage in new tab', async ({ page }) => {
    const linksPage = await navigateToLinksPage(page);

    await test.step('🔗 Click simple Home link and capture URL', async () => {
      const newTabUrl = await linksPage.clickSimpleHomeLink();
      expect(newTabUrl).toContain('demoqa.com');
    });
  });

  test('🔁 Clicking dynamic Home link opens homepage in new tab', async ({ page, context }) => {
    const linksPage = await navigateToLinksPage(page);

    await test.step('🪟 Open new tab and validate URL', async () => {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        linksPage.clickDynamicHomeLink(),
      ]);

      await newPage.waitForLoadState();
      expect(newPage.url()).toBe('https://demoqa.com/');
      await newPage.close();
    });
  });

  const statusLinks = [
    { id: 'created', expected: 'Link has responded with staus 201 and status text Created' },
    { id: 'no-content', expected: 'Link has responded with staus 204 and status text No Content' },
    { id: 'moved', expected: 'Link has responded with staus 301 and status text Moved Permanently' },
    { id: 'bad-request', expected: 'Link has responded with staus 400 and status text Bad Request' },
    { id: 'unauthorized', expected: 'Link has responded with staus 401 and status text Unauthorized' },
    { id: 'forbidden', expected: 'Link has responded with staus 403 and status text Forbidden' },
    { id: 'invalid-url', expected: 'Link has responded with staus 404 and status text Not Found' },
  ];

  for (const { id, expected } of statusLinks) {
    test(`📨 ${id} shows correct status response`, async ({ page }) => {
      const linksPage = await navigateToLinksPage(page);

      await test.step(`🔘 Click "${id}" link and validate response`, async () => {
        await linksPage.clickLinkAndWaitForResponse(id);
        await linksPage.assertResponseTextContains(expected);
      });
    });
  }

  const staticApiTests = [
    { id: 'created', emoji: '✅', code: 201 },
    { id: 'noContent', emoji: '🚫', code: 204 },
    { id: 'moved', emoji: '📦', code: 301 },
  ];

  for (const { id, emoji, code } of staticApiTests) {
    test(`${emoji} Clicking ${id} link shows correct response`, async ({ page }) => {
      const linksPage = await navigateToLinksPage(page);

      await test.step(`🔘 Click "${id}" API link and validate status ${code}`, async () => {
        await linksPage.clickApiLink(id);
        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toContain(`Link has responded with staus ${code}`);
      });
    });
  }
});
