// tests/links.spec.ts
import { expect, test } from '@playwright/test';
import { LinksPage } from '../page-objects/links-page';

test.describe('Links Page', () => {
  async function navigateToLinksPage(page): Promise<LinksPage> {
    return await test.step('Navigate to Links page', async () => {
      const linksPage = new LinksPage(page);
      await linksPage.goto.random();
      return linksPage;
    });
  }

  test('Clicking simple Home link opens demoqa.com homepage in new tab', { tag: '@sanity' }, async ({ page }) => {
    const linksPage = await navigateToLinksPage(page);

    await test.step('Click simple Home link and capture URL', async () => {
      const newTabUrl = await linksPage.clickSimpleHomeLink();
      expect(newTabUrl).toBe('https://demoqa.com/');
    });
  });

  test('Clicking dynamic Home link opens homepage in new tab', async ({ context, page }) => {
    const linksPage = await navigateToLinksPage(page);

    await test.step('Open new tab and validate URL', async () => {
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
  ] as const;

  for (const { expected, id } of statusLinks) {
    test(`${id} shows correct status response`, async ({ page }) => {
      const linksPage = await navigateToLinksPage(page);

      await test.step(`Click "${id}" link and validate response`, async () => {
        await linksPage.clickLinkAndWaitForResponse(id);
        await linksPage.assertResponseTextEquals(expected);
      });
    });
  }

  type StaticApiLinkId = 'created' | 'moved' | 'noContent';

  const staticApiTests: Array<{ expected: string; id: StaticApiLinkId }> = [
    { id: 'created', expected: 'Link has responded with staus 201 and status text Created' },
    { id: 'noContent', expected: 'Link has responded with staus 204 and status text No Content' },
    { id: 'moved', expected: 'Link has responded with staus 301 and status text Moved Permanently' },
  ];

  for (const { expected, id } of staticApiTests) {
    test(`Clicking ${id} link shows correct response`, async ({ page }) => {
      const linksPage = await navigateToLinksPage(page);

      await test.step(`Click "${id}" API link and validate response text`, async () => {
        await linksPage.clickApiLink(id);
        const responseText = await linksPage.getLinkResponseText();
        expect(responseText).toBe(expected);
      });
    });
  }
});
