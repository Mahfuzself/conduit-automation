import {test as setup } from '@playwright/test';
import {createRandomUser} from '../src/utils/testData';
import {UserApi} from '../src/api/userApi';
setup('Signup and login user', async () => {
    const userApi = new UserApi(request);
    const user = createRandomUser();                