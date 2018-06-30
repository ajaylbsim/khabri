import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../shared/user.service';
import {ToastrService} from 'ngx-toastr';
import {ChannelService} from '../shared/channel.service';
import {NodeService} from '../shared/NodeService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [NodeService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: {};
  tags = [];
  contents = [];
  statusList = [];
  sharedData = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private nodeService: NodeService
    ) { }

  ngOnInit() {
    this.user = {};



    this.route.data.subscribe(successData => {
      this.user = successData.user;
      // console.log('home user data ', this.user );
      this.sharedData['user'] = this.user;
      this.user['role'] = this.user['roles'][0]['roleName'];
      this.user['isAdmin'] = (this.user['role'] != 'ADMIN');

      // this.nodeService.addNode(this.sharedData);

      }
    );

    this.route.data.subscribe(successData => {
      // console.log('home  status .statusList ',  successData.statusList );
      this.statusList =  successData.statusList;
      this.sharedData['statusList'] = successData.statusList;
      this.nodeService.addNode(this.sharedData);

    });



  }

  onTagsChanged(event){

  }


  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }


}
