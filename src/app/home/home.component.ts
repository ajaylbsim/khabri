import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  statusList = [];
  sharedData = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private nodeService: NodeService
    ) { }

  ngOnInit() {
    this.user = {};


    this.route.data.subscribe(successData => {
      console.log(successData.user);
      this.user = successData.user;
      this.sharedData['user'] = this.user;
       this.user['role'] = 'ADMIN';
      this.user['isAdmin'] =  localStorage.getItem('isAdmin');
      }
    );

    this.route.data.subscribe(successData => {
      this.statusList =  successData.statusList;
      this.sharedData['statusList'] = successData.statusList;
      this.nodeService.addNode(this.sharedData);

    });



  }

  Logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
