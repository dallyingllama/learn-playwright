import { expect, test } from '@playwright/test';
import { checkForBlankCredentials } from '../../utils/annotations';

type MinimalTestInfo = {
  annotations: Array<{ type: string; description?: string }>;
};

test.describe('annotations unit tests', () => {
  test('adds warning annotation when username is blank', () => {
    const testInfo: MinimalTestInfo = { annotations: [] };

    checkForBlankCredentials('', 'Password123!', testInfo as any);

    expect(testInfo.annotations).toHaveLength(1);
    expect(testInfo.annotations[0].type).toBe('warning');
    expect(testInfo.annotations[0].description).toContain('Blank input detected');
  });

  test('adds warning annotation when password is blank', () => {
    const testInfo: MinimalTestInfo = { annotations: [] };

    checkForBlankCredentials('bob.slydel', '', testInfo as any);

    expect(testInfo.annotations).toHaveLength(1);
    expect(testInfo.annotations[0].type).toBe('warning');
    expect(testInfo.annotations[0].description).toContain('Blank input detected');
  });

  test('does not add annotation when both username and password are present', () => {
    const testInfo: MinimalTestInfo = { annotations: [] };

    checkForBlankCredentials('bob.slydel', 'Password123!', testInfo as any);

    expect(testInfo.annotations).toHaveLength(0);
  });
});
