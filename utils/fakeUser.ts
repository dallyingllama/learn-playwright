// utils/fakeUser.ts
import { faker } from '@faker-js/faker';

export interface FakeUser {
  fullName: string;
  email: string;
  password: string;
  currentAddress: string;
  permanentAddress: string;
}

export function generateFakeUser(): FakeUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({ length: 12 });
  const currentAddress = faker.location.streetAddress();
  const permanentAddress = faker.location.secondaryAddress();

  return {
    fullName: `${firstName} ${lastName}`,
    email,
    password,
    currentAddress,
    permanentAddress,
  };
}
