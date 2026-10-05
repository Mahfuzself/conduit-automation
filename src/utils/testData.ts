import {faker} from '@faker-js/faker';
export function createRandomUser() {
   const firstName = faker.person.firstName().toLowerCase().replace(/[^a-z]/g, '');
   const lastName = faker.person.lastName().toLowerCase().replace(/[^a-z]/g, '');
   const id = Date.now().toString().slice(-6);
   return{
        username: `${firstName}${id}`.slice(0, 20),
        email: `${firstName}.${lastName}${id}@yopmail.com`,
        password: 'Test@1234',
   };
}
export function createRandomArticle() {
   return {
        title: `${faker.lorem.sentence(4)} ${Date.now()}`,
        description: faker.lorem.sentence(8),
        body: faker.lorem.paragraph(3),
        tags: [faker.lorem.word(), faker.lorem.word()],
   };
}
export function createRandomProfile() {
   const user = createRandomUser();
   return {
        ...user,
        password: `New@${faker.string.alphanumeric(6)}`,
        bio: faker.lorem.sentence(10),
        image: faker.image.avatar(),
   };
}
