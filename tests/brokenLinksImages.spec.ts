// tests/brokenLinksImages.spec.ts
import { test, expect, request } from '@playwright/test';
import { BrokenLinksImagesPage } from '../pageObjects/BrokenLinksImagesPage';

test.describe('✅ Broken Links - Images', () => {
  async function navigateToBrokenLinksImages(page): Promise<BrokenLinksImagesPage> {
    return await test.step('🌐 Navigate to Broken Links - Images page', async () => {
      const brokenPage = new BrokenLinksImagesPage(page);
      await brokenPage.goto();
      return brokenPage;
    });
  }

  test('🖼️ should detect broken and valid images', async ({ page }) => {
    const brokenPage = await navigateToBrokenLinksImages(page);

    await test.step('📸 Collect all image elements', async () => {
      const images = await page.$$('img');
      expect(images.length).toBeGreaterThan(0);

      for (const img of images) {
        const isLoaded = await img.evaluate((imgEl: HTMLImageElement) => imgEl.naturalWidth > 0);
        const src = await img.getAttribute('src');
        console.log(`Image src="${src}" => ${isLoaded ? 'OK' : 'BROKEN'}`);
        expect(isLoaded, `Image with src="${src}" should load`).toBe(true);
      }
    });
  });

  test('🔗 should detect broken and valid links by status code', async ({ page, request }) => {
    const brokenPage = await navigateToBrokenLinksImages(page);

    await test.step('🔍 Collect and validate all link elements', async () => {
      const links = await page.$$('a[href]');
      expect(links.length).toBeGreaterThan(0);

      for (const link of links) {
        const url = await link.getAttribute('href');
        if (!url || url.startsWith('javascript')) continue;

        const response = await request.get(url);
        console.log(`Link "${url}" => ${response.status()}`);
        expect(response.status(), `Link "${url}" should return status < 400`).toBeLessThan(400);
      }
    });
  });
});
