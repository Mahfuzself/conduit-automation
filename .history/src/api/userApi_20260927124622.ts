import {APIRequestContext,expect} from '@playwright/test';
export class UserApi{
    constructor(private request: APIRequestContext) {}
    async signup(user : {username : string, email : string , password : string}){
      const signupResponse = await this.request.post(`${process.env.API_URL}/users`,{
         data : user
      });
      return signupResponse.json();
      
    }
}