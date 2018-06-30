import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  toast={toastId:0}

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    console.log("user name = " + userName + " password = " + password);
    // if (password == "123") {
    //   localStorage.setItem("userToken", password);
    //   this.toastr.clear(this.toast.toastId);
    //   this.toast = this.toastr.success('Welcome to khabri !');
    //   this.router.navigate(['/home/channel']);
    // }


       this.userService.userAuthentication(userName,password).subscribe((data : any)=>{

           let role  = data['roles'][0]['roleName'];

           localStorage.setItem('isAdmin', (role =='ADMIN') + '');
           localStorage.setItem('user',JSON.stringify(data));
           // localStorage.setItem("userToken", password);
           this.toastr.clear(this.toast.toastId);
           this.toast = this.toastr.success('Welcome to khabri !');
           this.router.navigate(['/home/channel']);
      },
      (err: HttpErrorResponse)=>{
        this.isLoginError = true;
        console.log(HttpErrorResponse);
        this.toast = this.toastr.error(' ! HttpErrorResponse');

      });

  }
}

