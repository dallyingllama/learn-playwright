import { faker } from '@faker-js/faker';

export function generateFakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({ length: 12 });

  return {
    fullName: `${firstName} ${lastName}`,
    email,
    password
  };
}
