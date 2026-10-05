import {faker} from '@faker-js/faker';
export function createRandomUser() {
   return {
    username : faker.internet.username() + Date.now(),
   }
}