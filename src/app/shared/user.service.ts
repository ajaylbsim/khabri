import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://139.59.36.228:8080/khabri-web-app/khabri/';
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
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password) {
    //http://139.59.36.228:8080/khabri-web-app/khabri/userService/v2/user/findUser?email=aankit%40getkhabri.com&password=aankitroy123

      var data = "email=" + userName + "&password=" + password;
   // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.get(this.rootUrl + 'userService/v2/user/findUser?'+data);
  }

  getUserClaims(){
   return {"UserName":"ajay mishra"} //this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  getUserDetails(email,password){
      return this.http.get(this.rootUrl+'/userService/v2/user/findUser'+'?email='+email+'&password='+password);
  }






}
