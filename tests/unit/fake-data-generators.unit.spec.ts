import { expect, test } from '@playwright/test';
import { generateFakeTableUser } from '../../utils/fakeTableUser';
import { generateFakeUser } from '../../utils/fakeUser';

function isNumericString(value: string): boolean {
  return /^\d+$/.test(value);
}

test.describe('fake data generator unit tests', () => {
  test('generateFakeUser returns expected shape', () => {
    const user = generateFakeUser();

    expect(user.fullName.length).toBeGreaterThan(0);
    expect(user.email.length).toBeGreaterThan(0);
    expect(user.password.length).toBeGreaterThan(0);
    expect(user.currentAddress.length).toBeGreaterThan(0);
    expect(user.permanentAddress.length).toBeGreaterThan(0);

    expect(user.email).toContain('@');
  });

  test('generateFakeTableUser returns expected shape and numeric fields', () => {
    const user = generateFakeTableUser();

    expect(user.firstName.length).toBeGreaterThan(0);
    expect(user.lastName.length).toBeGreaterThan(0);
    expect(user.email.length).toBeGreaterThan(0);
    expect(user.department.length).toBeGreaterThan(0);

    expect(isNumericString(user.age)).toBe(true);
    expect(isNumericString(user.salary)).toBe(true);
  });
});
