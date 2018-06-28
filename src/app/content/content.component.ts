import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContentService} from "../shared/content.service";
import {NodeService} from "../shared/NodeService";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  statusList = [
 //  {"statusId":3,"statusName":"EDITED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
  //   {"statusId":5,"statusName":"REVIEWED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
    // {"statusId":4,"statusName":"DELETED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"}
  ];
  user = {};
  contents = [];
   id= 0;
   title: '';
  currntPlayerId=-9;
  audio = new Audio();
  selectedStatusId = null;

  content={
    title:'test!'
  }
  constructor(private route :ActivatedRoute,private contentService:ContentService,private router: Router, private nodeService : NodeService) { }
  ngOnInit() {
    this.audio = new Audio();


    this.nodeService.node$.subscribe(n => {
      console.log('shared data are', n);
      this.statusList = n['statusList'];
      this.user = n['user'];
      this.user['role'] = '';
      this.user['role'] = this.user['roles'][0]['roleName'];


      console.log('home user role>> ', this.user['role']  );

    });


    console.log(  this.route.params['_value'].id)

   this.id = this.route.params['_value'].id;


    this.route.queryParams.subscribe(params=>{
      this.title = params.title;
    })








    this.contentService.getContentBychannelId(this.route.params['_value'].id, this.selectedStatusId).subscribe( successData =>{
    const status = {};

      for(const successDataKey in successData) {
        this.contents.push(successData[successDataKey]);

        status[successData[successDataKey].status['statusName']] = successData[successDataKey].status;
      }

      console.log(status);

      console.log(JSON.stringify(status));


    });
  }


  play(url: string, id: any) {
    if (url == null) return;
    if (this.audio.paused) {
      this.audio.src = url;
      this.audio.play();
      this.currntPlayerId = id;
    } else {
      // this.audio.src = url;
      console.log('--' + this.currntPlayerId);

      this.currntPlayerId = 909999;
      this.audio.pause();
      console.log('--' + this.currntPlayerId);
    }
  }




  addContent(id: string) {

   this.router.navigate(['/home/' + id + '/add-content' ]);

  }

  OnStatusSelect() {
    console.log('selectedStatusId '+this.selectedStatusId);
  }



}
