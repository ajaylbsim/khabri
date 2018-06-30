import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentService} from '../shared/content.service';
import {NodeService} from '../shared/NodeService';
import {ChannelService} from '../shared/channel.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  statusList = [
      {'statusId':1,'statusName':'ACTIVE','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
      {'statusId':2,'statusName':'IN-ACTIVE','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
      {'statusId':3,'statusName':'EDITED','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
      {'statusId':4,'statusName':'DELETED','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
      {'statusId':5,'statusName':'REVIEWED','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
      {'statusId':6,'statusName':'RECORDED','dateAdded':'2017-11-20T11:20:45','dateModified':'2017-11-20T11:20:45'}
    ];
  user = {};
  contents = [];
   id= 0;
   title: '';
  currntPlayerId= -9;
  audio = new Audio();
  selectedStatusId = 5;
  previusStatusId = null;
  contentServiceObserver = null;
  content= {
    title: 'test!',
    editedCount:0,
    liveCount:0
  }

  constructor(private route: ActivatedRoute, private contentService: ContentService, private router: Router, private nodeService: NodeService,  private channelService : ChannelService) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.title = params['title'];



      this.channelService.getChannelMetaData(params['id'] ).subscribe(data => {
        console.log(' content added ', data);
        console.log(' content added ', data['contentCountByStatus']);
        this.content.editedCount = data['contentCountByStatus'][3];
        this.content.liveCount = data['contentCountByStatus'][1];


      });
    });

  }





  ngOnInit() {
    this.audio = new Audio();


    this.nodeService.node$.subscribe(n => {
      this.user = n['user'];
      this.user['role'] = '';
      this.user['role'] = this.user['roles'][0]['roleName'];
    });




    // this.route.queryParams.subscribe(params => {
    //   this.title = params.title;
    // });







  this.contentService.getContentBychannelId(this.route.params['_value'].id, this.selectedStatusId).subscribe( successData =>{
    const status = {};

      for(const successDataKey in successData) {
        this.contents.push(successData[successDataKey]);

        status[successData[successDataKey].status['statusName']] = successData[successDataKey].status;
      }

      // console.log(status);

      // console.log(JSON.stringify(status));


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
    this.previusStatusId = this.selectedStatusId;

    console.log('selectedStatusId ', this.selectedStatusId, event);
    if(this.contentServiceObserver)
    this.contentServiceObserver.unsubscribe();

    this.contentServiceObserver =  this.contentService.getContentBychannelId(this.route.params['_value'].id, this.selectedStatusId).subscribe( successData =>{
      const status = {};
      this.contents = [];
      for(const successDataKey in successData) {
        this.contents.push(successData[successDataKey]);

        status[successData[successDataKey].status['statusName']] = successData[successDataKey].status;
      }

      console.log(status);

      console.log(JSON.stringify(status));


    });
  }

  }




