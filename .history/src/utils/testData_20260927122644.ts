import {faker} from '@faker-js/faker';
export function createRandomUser() {
    const randomUser = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    return randomUser;
}