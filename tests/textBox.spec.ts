// tests/textBox.spec.ts
import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pageObjects/TextBoxPage';
import { generateFakeUser } from '../utils/fakeUser';

test.describe('📝 Text Box Form Tests', () => {
  test('✅ Submit valid form data shows correct output', { tag: '@sanity' }, async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    const user = generateFakeUser();

    await test.step('📄 Navigate to Text Box page', async () => {
      await textBoxPage.goto();
    });

    await test.step('📝 Fill form with valid user data', async () => {
      await textBoxPage.fillForm({
        fullName: user.fullName,
        email: user.email,
        currentAddress: user.currentAddress,
        permanentAddress: user.permanentAddress,
      });
    });

    await test.step('📤 Submit the form', async () => {
      await textBoxPage.submit();
    });

    await test.step('✅ Verify output contains submitted values', async () => {
      await expect(textBoxPage.outputName).toHaveText(`Name:${user.fullName}`);
      await expect(textBoxPage.outputEmail).toHaveText(`Email:${user.email}`);
      await expect(textBoxPage.outputCurrentAddress).toHaveText(`Current Address :${user.currentAddress}`);
      await expect(textBoxPage.outputPermanentAddress).toHaveText(`Permananet Address :${user.permanentAddress}`);
    });
  });

  test('❌ Invalid email should prevent output and highlight field', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    const user = generateFakeUser();

    await test.step('📄 Navigate to Text Box page', async () => {
      await textBoxPage.goto();
    });

    await test.step('📝 Fill form with invalid email', async () => {
      await textBoxPage.fillForm({
        fullName: user.fullName,
        email: 'not-an-email',
        currentAddress: user.currentAddress,
        permanentAddress: user.permanentAddress,
      });
    });

    await test.step('📤 Submit the form', async () => {
      await textBoxPage.submit();
    });

    await test.step('🚫 Verify email field shows error and no output appears', async () => {
      const emailField = textBoxPage.emailInput;
      await expect(emailField).toHaveClass(/field-error|is-invalid/); // adjust based on actual app behavior
      await expect(textBoxPage.output).toBeHidden();
    });
  });
});
