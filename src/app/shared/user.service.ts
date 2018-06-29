import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import {Constants} from './config/constants';
import {environment} from "../../environments/environment.prod";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(Constants.SERVER_URL + 'api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {
    const env = environment
      var data = "email=" + userName + "&password=" + password;
      console.log(Constants.SERVER_URL + 'userService/v2/user/findUser?' + data);

    return this.http.get(Constants.SERVER_URL + 'userService/v2/user/findUser?'+data);
  }

  getUserClaims(){
   return {"UserName":"ajay mishra"} //this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  getUserDetails(email,password){
      return this.http.get(Constants.SERVER_URL+'userService/v2/user/findUser'+'?email='+email+'&password='+password);
  }






}
