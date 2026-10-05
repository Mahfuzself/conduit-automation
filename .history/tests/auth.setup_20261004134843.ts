import {test as setup } from '@playwright/test';
import {createRandomUser} from '../src/utils/testData';
import {UserApi} from '../src/api/userApi';
setup('Signup and login user', async ({request,page}) => {
    const userApi = new UserApi(request);
    const user = createRandomUser();
    await userApi.signup(user);  
    await userApi.login({email : user.email, password : user.password});  
     const token = await userApi.login({ email: user.email, password: user.password });
   
    });