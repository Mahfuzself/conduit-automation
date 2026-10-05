import {faker} from '@faker-js/faker';
export function createRandomUser() {
    const randomUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    return randomUser;
}