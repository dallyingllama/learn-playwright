// tests/webTables.spec.ts
import { test, expect } from '@playwright/test';
import { LinksPage } from '../pageObjects/LinksPage';

test.describe('🔗 Links Page', () => {
  test('🧪 Clicking simple Home link opens demoqa.com homepage in new tab', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto();
  
    const newTabUrl = await linksPage.clickSimpleHomeLink();
    expect(newTabUrl).toContain('demoqa.com');
  });
  
  test('🔁 dynamicLink opens new tab to homepage', async ({ page, context }) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto();

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      linksPage.clickDynamicHomeLink(),
    ]);

    await newPage.waitForLoadState();
    expect(newPage.url()).toBe('https://demoqa.com/');
    await newPage.close();
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
      const linksPage = new LinksPage(page);
      await linksPage.goto();

      await linksPage.clickLinkAndWaitForResponse(id);
      await linksPage.assertResponseTextContains(expected);
    });
  }

  test('✅ Clicking Created link shows correct response', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto();

    await linksPage.clickApiLink('created');
    const responseText = await linksPage.getLinkResponseText();
    expect(responseText).toContain('Link has responded with staus 201');
  });

  test('🚫 Clicking No Content link shows correct response', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto();

    await linksPage.clickApiLink('noContent');
    const responseText = await linksPage.getLinkResponseText();
    expect(responseText).toContain('Link has responded with staus 204');
  });

  test('📦 Clicking Moved link shows correct response', async ({ page }) => {
    const linksPage = new LinksPage(page);
    await linksPage.goto();

    await linksPage.clickApiLink('moved');
    const responseText = await linksPage.getLinkResponseText();
    expect(responseText).toContain('Link has responded with staus 301');
  });
});
