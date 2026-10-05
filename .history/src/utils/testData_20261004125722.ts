import {faker} from '@faker-js/faker';
export function createRandomUser() {
   const firstName = faker.person.firstName().toLowerCase().replace(/[^a-z]/g, '');
   const lastName = faker.person.lastName().toLowerCase().replace(/[^a-z]/g, '');
   const id = Date.now();
   return{
    
   }
   const email = `${username}@example.com`;
}