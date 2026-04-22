// tests/brokenLinksImages.spec.ts
import { test, expect, request } from '@playwright/test';
import { BrokenLinksImagesPage } from '../page-objects/broken-links-images-page';

test.describe('✅ Broken Links - Images', () => {
  async function navigateToBrokenLinksImages(page): Promise<BrokenLinksImagesPage> {
    return await test.step('🌐 Navigate to Broken Links - Images page', async () => {
      const brokenPage = new BrokenLinksImagesPage(page);
      await brokenPage.goto.random();
      return brokenPage;
    });
  }

  test('🖼️ should detect broken and valid images', async ({ page }) => {
    const brokenPage = await navigateToBrokenLinksImages(page);

    await test.step('📸 Collect all image elements', async () => {
      const contentImages = page.locator('img').filter({ hasNot: page.locator('[src*="Toolsqa"]') });
      const imageCount = await contentImages.count();
      expect(imageCount).toBeGreaterThanOrEqual(2);

      await expect
        .poll(async () => {
          const statuses: Array<{ src: string | null; isLoaded: boolean; isComplete: boolean }> = [];

          for (let i = 0; i < imageCount; i++) {
            const img = contentImages.nth(i);
            const imageState = await img.evaluate((imgEl: HTMLImageElement) => ({
              isLoaded: imgEl.naturalWidth > 0,
              isComplete: imgEl.complete,
            }));
            const src = await img.getAttribute('src');
            statuses.push({ src, ...imageState });
          }

          const completeStatuses = statuses.filter((image) => image.isComplete);
          return {
            hasLoadedImage: completeStatuses.some((image) => image.isLoaded),
            hasBrokenImage: completeStatuses.some((image) => !image.isLoaded),
          };
        })
        .toEqual({
          hasLoadedImage: true,
          hasBrokenImage: true,
        });
    });
  });

  test('🔗 should detect broken and valid links by status code', { tag: '@sanity' }, async ({ page, request }) => {
    const brokenPage = await navigateToBrokenLinksImages(page);

    await test.step('🔍 Collect and validate all link elements', async () => {
      const validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
      const brokenLink = page.getByRole('link', { name: 'Click Here for Broken Link' });

      const validUrl = await validLink.getAttribute('href');
      const brokenUrl = await brokenLink.getAttribute('href');

      expect(validUrl).toBeTruthy();
      expect(brokenUrl).toBeTruthy();

      const validResponse = await request.get(validUrl!);
      const brokenResponse = await request.get(brokenUrl!);

      expect(validResponse.status()).toBeLessThan(400);
      expect(brokenResponse.status()).toBeGreaterThanOrEqual(400);
    });
  });
});
