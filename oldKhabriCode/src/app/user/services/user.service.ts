import { Constants } from './../../shared/config/constants';
import { DataService } from './../../shared/services/data.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService extends DataService {

  constructor(http: Http) {
    super(Constants.SERVER_URL + '/khabri/userService/v2/user', http);
  }
  public findUserByEmailAndPassword(email: string, password: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('email', email);
    params.set('password', password);
    return this.http.get( this.url + '/findUser', { headers : this.getHeaders(), search : params})
    .map(response => {
      const result = response.json() as User;
      if (null != result) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(result));
        return true;
      }
    })
    .catch(this.handleError);
  }

  public findUserByEmail(email: string) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('email', email);
    return this.http.get( this.url + '/findUserByEmail', { headers : this.getHeaders(), search : params})
    .map(response => {
      const result = response.json() as User;
      if (null != result) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(result));
        return true;
      }
    })
    .catch(this.handleError);
  }

  private getHeaders() {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  isUserLoggedIn() {
     const user: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
     if (null != user) {
       return true;
     } else {
       return false;
     }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
  }
}
