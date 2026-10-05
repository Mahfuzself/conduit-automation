import {test as setup } from '@playwright/test';
import {createRandomUser} from '../src/utils/testData';
import {UserApi} from '../src/api/userApi';
const authFile = 'playwright/.auth/user.json';
setup('Signup and login user', async ({request,page}) => {
    const userApi = new UserApi(request);
    const user = createRandomUser();
    await userApi.signup(user); 
     const token = await userApi.login({ email: user.email, password: user.password });
        await page.goto('/');
        await page.evaluate((t) => localStorage.setItem('jwtToken', t), token);
        await page.context().storageState({ path: authFile });
   
    });