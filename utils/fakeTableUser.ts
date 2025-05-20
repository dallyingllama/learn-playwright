// utils/fakeTableUser.ts
import { faker } from '@faker-js/faker';

export function generateFakeTableUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 65 }).toString(),
    salary: faker.number.int({ min: 30000, max: 150000 }).toString(),
    department: faker.commerce.department(),
  };
}
