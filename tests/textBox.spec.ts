import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pageObjects/TextBoxPage';
import { generateFakeUser } from '../utils/fakeUser';

test.describe('📝 Text Box Form Tests', () => {
  test('✅ Submit valid form data shows correct output', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto(); 

    const user = generateFakeUser();

    await textBoxPage.fillForm({
      fullName: user.fullName,
      email: user.email,
      currentAddress: user.currentAddress,
      permanentAddress: user.permanentAddress,
    });

    await textBoxPage.submit();

    await expect(textBoxPage.outputName).toHaveText(`Name:${user.fullName}`);
    await expect(textBoxPage.outputEmail).toHaveText(`Email:${user.email}`);
    await expect(textBoxPage.outputCurrentAddress).toHaveText(`Current Address :${user.currentAddress}`);
    await expect(textBoxPage.outputPermanentAddress).toHaveText(`Permananet Address :${user.permanentAddress}`);
  });

  test('❌ Invalid email should prevent output and highlight field', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto(); // uses random strategy

    const user = generateFakeUser();

    await textBoxPage.fillForm({
      fullName: user.fullName,
      email: 'not-an-email', // invalid email
      currentAddress: user.currentAddress,
      permanentAddress: user.permanentAddress,
    });

    await textBoxPage.submit();

    const emailField = await textBoxPage.getEmailField();
    await expect(emailField).toHaveClass(/field-error|is-invalid/); // adapt class as needed
    await expect(textBoxPage.output).toBeHidden();
  });
});