import { expect, test } from '@playwright/test';
import {
  SECTION_KEYS_ORDER,
  SECTION_LANDING_MESSAGE,
  sectionMetadata,
  type SectionKey,
} from '../../page-objects/metadata/section-metadata';

test.describe('section metadata unit tests', () => {
  test('SECTION_KEYS_ORDER contains unique keys', () => {
    const unique = new Set(SECTION_KEYS_ORDER);
    expect(unique.size).toBe(SECTION_KEYS_ORDER.length);
  });

  test('every ordered key exists in sectionMetadata', () => {
    for (const key of SECTION_KEYS_ORDER) {
      expect(sectionMetadata[key as SectionKey]).toBeDefined();
    }
  });

  test('every section entry has required values', () => {
    for (const key of SECTION_KEYS_ORDER) {
      const entry = sectionMetadata[key as SectionKey];
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.url.length).toBeGreaterThan(0);
      expect(entry.homeCard.length).toBeGreaterThan(0);
      expect(['sectionLanding', 'bookStoreLanding']).toContain(entry.landingType);
    }
  });

  test('shared landing message is not blank', () => {
    expect(SECTION_LANDING_MESSAGE.length).toBeGreaterThan(0);
  });
});
