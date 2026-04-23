import { expect, test } from '@playwright/test';
import { ButtonsPage } from '../page-objects/buttons-page';

test.describe('Buttons Page', () => {
  async function navigateToButtonsPage(page): Promise<ButtonsPage> {
    return await test.step('Navigate to Buttons page', async () => {
      const buttonsPage = new ButtonsPage(page);
      await buttonsPage.goto.random();
      return buttonsPage;
    });
  }

  const buttonScenarios: Array<{
    dataname: string;
    expectedMessage: string;
    runAction: (buttonsPage: ButtonsPage) => Promise<void>;
    readMessage: (buttonsPage: ButtonsPage) => Promise<string>;
  }> = [
    {
      dataname: 'Double click button shows correct message',
      expectedMessage: 'You have done a double click',
      runAction: async (buttonsPage) => {
        await buttonsPage.doubleClick();
      },
      readMessage: async (buttonsPage) => buttonsPage.getDoubleClickMessage(),
    },
    {
      dataname: 'Right click button shows correct message',
      expectedMessage: 'You have done a right click',
      runAction: async (buttonsPage) => {
        await buttonsPage.rightClick();
      },
      readMessage: async (buttonsPage) => buttonsPage.getRightClickMessage(),
    },
    {
      dataname: 'Dynamic click button shows correct message',
      expectedMessage: 'You have done a dynamic click',
      runAction: async (buttonsPage) => {
        await buttonsPage.dynamicClick();
      },
      readMessage: async (buttonsPage) => buttonsPage.getDynamicClickMessage(),
    },
  ];

  for (const [index, scenario] of buttonScenarios.entries()) {
    test(scenario.dataname, index === 0 ? { tag: '@sanity' } : {}, async ({ page }) => {
      const buttonsPage = await navigateToButtonsPage(page);

      await test.step('Perform click action', async () => {
        await scenario.runAction(buttonsPage);
      });

      await test.step('Verify click message', async () => {
        const msg = await scenario.readMessage(buttonsPage);
        expect(msg).toBe(scenario.expectedMessage);
      });
    });
  }
});
