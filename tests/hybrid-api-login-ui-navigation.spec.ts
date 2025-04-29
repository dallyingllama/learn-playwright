import { test, expect, request } from '@playwright/test';

test('Create a post using API and verify in the UI', async ({ page }) => {
  // Step 1: Authenticate via API and create a post
  const apiContext = await request.newContext({
    ignoreHTTPSErrors: true,
  });

  const postData = {
    title: 'Test Post',
    body: 'This is a test post created via API.',
    userId: 1,
  };

  // Sending POST request to create a new post
  const apiResponse = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {
    data: postData,
  });

  expect(apiResponse.ok()).toBeTruthy();
  const apiResponseData = await apiResponse.json();
  const newPostId = apiResponseData.id;

  console.log(`New Post Created: ${newPostId}`);

  // Step 2: Navigate to the UI and verify the post appears in the posts section
  await page.goto('https://jsonplaceholder.typicode.com/');

  // Go to the Posts page
  await page.click('text=Posts');

  // Wait for the post to appear in the list
  const postLocator = page.locator(`text=${postData.title}`);
  await expect(postLocator).toBeVisible();

  // Verify if the post's content matches the one created by API
  const postBodyLocator = postLocator.locator('xpath=..//following-sibling::div');
  await expect(postBodyLocator).toHaveText(postData.body);
});
