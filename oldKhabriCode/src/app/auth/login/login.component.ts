import { UserService } from './../../user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GoogleSignInSuccess} from 'angular-google-signin';
import { User } from 'app/user/model/user';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  private myClientId: string;

  constructor(private router: Router, private userService: UserService) {
   }

  ngOnInit() {
    this.myClientId = '336285980569-rh9pfbrr1qiaps16a9gp96ufiu2jcaa9.apps.googleusercontent.com';
    this.validateLogin();
  }

  signIn(credentials) {
    this.userService.findUserByEmailAndPassword(credentials.email, credentials.password)
    .subscribe(result => {
        if (result) {
          this.router.navigate(['/homepage']);
        } else {
          this.invalidLogin = true;
        }
    });

  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    this.userService.findUserByEmail(profile.getEmail())
    .subscribe(result => {
      if (result) {
        this.router.navigate(['/homepage']);
      } else {
        this.invalidLogin = true;
      }
    });
  }

  validateLogin() {
    const user: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user != null) {
    this.userService.findUserByEmailAndPassword(user['email'], user['password'])
    .subscribe(result => {
        if (result) {
          this.router.navigate(['/homepage']);
        }
    });
  }
  }
}
