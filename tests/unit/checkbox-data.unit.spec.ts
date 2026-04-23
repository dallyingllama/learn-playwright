import { expect, test } from '@playwright/test';
import {
  checkboxSelectionScenarios,
  checkboxTreeData,
  type CheckboxTreeNode,
} from '../../data/checkboxData';

function flattenLabels(node: CheckboxTreeNode): string[] {
  const labels = [node.label];
  for (const child of node.children ?? []) {
    labels.push(...flattenLabels(child));
  }
  return labels;
}

test.describe('checkbox data unit tests', () => {
  test('checkbox tree contains nodes', () => {
    const labels = flattenLabels(checkboxTreeData);
    expect(labels.length).toBeGreaterThan(1);
  });

  test('scenario labels and expand paths exist in tree', () => {
    const labels = new Set(flattenLabels(checkboxTreeData));

    for (const scenario of Object.values(checkboxSelectionScenarios)) {
      expect(labels.has(scenario.label)).toBe(true);

      for (const pathLabel of scenario.expandPath ?? []) {
        expect(labels.has(pathLabel)).toBe(true);
      }
    }
  });

  test('checked and indeterminate labels in scenarios exist in tree', () => {
    const labels = new Set(flattenLabels(checkboxTreeData));

    for (const scenario of Object.values(checkboxSelectionScenarios)) {
      for (const checked of scenario.expectedCheckedNodes ?? []) {
        expect(labels.has(checked)).toBe(true);
      }
      for (const indeterminate of scenario.expectedIndeterminateNodes ?? []) {
        expect(labels.has(indeterminate)).toBe(true);
      }
    }
  });

  test('expected selected items arrays are not empty', () => {
    for (const scenario of Object.values(checkboxSelectionScenarios)) {
      expect(scenario.expectedSelectedItems.length).toBeGreaterThan(0);
    }
  });
});
