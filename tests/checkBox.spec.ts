// tests/checkBox.spec.ts
import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../page-objects/check-box-page';
import { checkboxTreeData, checkboxSelectionScenarios, CheckboxTreeNode } from '../data/checkboxData';

test.describe('Elements', () => {
  test.describe('✅ Check Box', () => {
    async function navigateToCheckBoxPage(page): Promise<CheckBoxPage> {
      return await test.step('🌐 Navigate to Check Box page', async () => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.goto.random();
        return checkBoxPage;
      });
    }

    async function verifyHierarchy(checkBoxPage: CheckBoxPage, node: CheckboxTreeNode): Promise<void> {
      await test.step(`👀 Verify node "${node.label}" is visible`, async () => {
        await checkBoxPage.expectNodeVisible(node.label);
      });

      const children = node.children ?? [];
      if (!children.length) {
        return;
      }

      await test.step(`🔽 Expand "${node.label}"`, async () => {
        await checkBoxPage.expand(node.label, children[0]?.label);
      });

      await test.step(`🧭 Verify children of "${node.label}"`, async () => {
        const visibleChildren = await Promise.all(
          children.map(async (child) => {
            await checkBoxPage.expectNodeVisible(child.label);
            return child.label;
          })
        );

        expect(visibleChildren).toEqual(children.map((child) => child.label));
      });

      for (const child of children) {
        await verifyHierarchy(checkBoxPage, child);
      }
    }

    async function expandHierarchy(checkBoxPage: CheckBoxPage, node: CheckboxTreeNode): Promise<void> {
      const children = node.children ?? [];
      if (!children.length) {
        return;
      }

      await checkBoxPage.expand(node.label, children[0]?.label);

      for (const child of children) {
        await expandHierarchy(checkBoxPage, child);
      }
    }

    test('✅ Expand checkbox tree and verify hierarchy matches data', { tag: '@sanity' }, async ({ page }) => {
      const checkBoxPage = await navigateToCheckBoxPage(page);

      await verifyHierarchy(checkBoxPage, checkboxTreeData);
    });

    test('✅ Clicking parent checkbox ticks all child checkboxes', async ({ page }) => {
      const checkBoxPage = await navigateToCheckBoxPage(page);
      const scenario = checkboxSelectionScenarios.home;

      await test.step(`☑️ Check "${scenario.label}"`, async () => {
        await checkBoxPage.check(scenario.label);
      });

      await test.step('✅ Verify selected items message', async () => {
        await checkBoxPage.expectSelectedItems(scenario.expectedSelectedItems);
      });

      await test.step('✅ Verify all expected checkboxes are checked', async () => {
        await expandHierarchy(checkBoxPage, checkboxTreeData);

        for (const label of scenario.expectedCheckedNodes ?? []) {
          await checkBoxPage.expectChecked(label);
        }
      });
    });

    test('✅ Clicking child checkbox ticks all parent checkboxes', async ({ page }) => {
      const checkBoxPage = await navigateToCheckBoxPage(page);
      const scenario = checkboxSelectionScenarios.general;

      await test.step(`🔽 Expand path to "${scenario.label}"`, async () => {
        const path = scenario.expandPath ?? [];
        for (let i = 0; i < path.length; i++) {
          await checkBoxPage.expand(path[i], path[i + 1]);
        }
      });

      await test.step(`☑️ Check "${scenario.label}"`, async () => {
        await checkBoxPage.check(scenario.label);
      });

      await test.step('✅ Verify selected items message', async () => {
        await checkBoxPage.expectSelectedItems(scenario.expectedSelectedItems);
      });

      await test.step('✅ Verify parent chain checkboxes are checked', async () => {
        await expandHierarchy(checkBoxPage, checkboxTreeData);

        for (const label of scenario.expectedCheckedNodes ?? []) {
          await checkBoxPage.expectChecked(label);
        }

        for (const label of scenario.expectedIndeterminateNodes ?? []) {
          await checkBoxPage.expectIndeterminate(label);
        }
      });
    });
  });
});
