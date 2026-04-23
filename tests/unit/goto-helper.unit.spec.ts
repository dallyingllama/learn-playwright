import { expect, test } from '@playwright/test';
import { createGotoWithVariants } from '../../utils/gotoHelper';

test.describe('gotoHelper unit tests', () => {
  test('uses viaDirectLink as default goto method', async () => {
    const calls: string[] = [];
    const goto = createGotoWithVariants(
      async () => {
        calls.push('viaMenu');
      },
      async () => {
        calls.push('viaDirectLink');
      }
    );

    await goto();
    expect(calls).toEqual(['viaDirectLink']);
  });

  test('supports overriding default goto method to viaMenu', async () => {
    const calls: string[] = [];
    const goto = createGotoWithVariants(
      async () => {
        calls.push('viaMenu');
      },
      async () => {
        calls.push('viaDirectLink');
      },
      { defaultMethod: 'viaMenu' }
    );

    await goto();
    expect(calls).toEqual(['viaMenu']);
  });

  test('random() chooses viaMenu when Math.random() > 0.5', async () => {
    const calls: string[] = [];
    const goto = createGotoWithVariants(
      async () => {
        calls.push('viaMenu');
      },
      async () => {
        calls.push('viaDirectLink');
      }
    );

    const originalRandom = Math.random;
    Math.random = () => 0.9;

    try {
      await goto.random();
    } finally {
      Math.random = originalRandom;
    }

    expect(calls).toEqual(['viaMenu']);
  });

  test('random() chooses viaDirectLink when Math.random() <= 0.5', async () => {
    const calls: string[] = [];
    const goto = createGotoWithVariants(
      async () => {
        calls.push('viaMenu');
      },
      async () => {
        calls.push('viaDirectLink');
      }
    );

    const originalRandom = Math.random;
    Math.random = () => 0.2;

    try {
      await goto.random();
    } finally {
      Math.random = originalRandom;
    }

    expect(calls).toEqual(['viaDirectLink']);
  });
});
