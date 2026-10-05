import {APIRequestContext,expect} from '@playwright/test';
export class UserApi{
    constructor(private request: APIRequestContext) {}
    async signup(user : {username : string, email : string , password : string}){
      const signupResponse = await this.request.post(`${process.env.API_URL}users`,{
         data : {user}
      });
      expect(signupResponse.status(), await signupResponse.text()).toBe(201);
      return signupResponse.json();

    }
    async login(user: { email: string; password: string }) {
      const loginResponse = await this.request.post(`${process.env.API_URL}users/login`, {
      data: { user: { email: user.email, password: user.password } },
  });

    expect(loginResponse.status()).toBe(200);
    const body = await loginResponse.json();
    return body.user.token as string;
}

}