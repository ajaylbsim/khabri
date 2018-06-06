import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../shared/user.service';
import {ToastrService} from "ngx-toastr";
import {ChannelService} from "../shared/channel.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: {};
  tags = [];
  contents =[]

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private channelService : ChannelService
    ) { }

  ngOnInit() {

    this.channelService.getChannelByUserId(1).subscribe( successData =>{

      for (let successDataKey in successData) {
       // console.log(successData[successDataKey].title,successData[successDataKey]);
      }


    });

    console.log("this.route.data",this.route.data);

    this.route.data.subscribe(successData=>{
      console.log('user found is ',successData);
      this.userClaims = successData.user;
    },
    error =>{
      console.log("error in fetching user",error);

    }
    )


 this.userClaims  = {"UserName":"ajay mishra","Email":"ajaylbsim@gmail.com","FirstName":"ajay","LastName":"mishra"}
 // =   this.userService.getUserClaims(); //.subscribe((data: any) => {
  this.contents = [{name:'A',id:1 },{name:'B',id:2 },{name:'C',id:3 },{name:'D',id:4 },{name:'E',id:5 },{name:'F',id:6 } ];
     this.userClaims = this.userService.getUserDetails('aankit@getkhabri.com','aankitroy123').subscribe(res=>{
       this.userClaims = res;
     },
       errorRes=>{
         this.toastr.error(errorRes.error.message|| "something went wrong!");

       }
       );
  }

  onTagsChanged(event){

  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


}
