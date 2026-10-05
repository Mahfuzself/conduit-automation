import {faker} from '@faker-js/faker';
export function createRandomUser() {
   return {
    username : faker.internet.username() + Date.now(),
    email : faker.internet.email().toLowerCase(),
    password : faker.internet.password({length : 8})
   };
}