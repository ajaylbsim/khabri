import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ContentService} from '../shared/content.service';
import {NodeService} from '../shared/NodeService';
import {ChannelService} from '../shared/channel.service';

@Component({
  selector:  'app-content',
  templateUrl:  './content.component.html',
  styleUrls:  ['./content.component.css']
})
export class ContentComponent implements OnInit {
  statusList = [
      // {'statusId': 1,'statusName': 'ACTIVE','dateAdded': '2017-10-29T18: 58: 27','dateModified': '2017-10-29T18: 58: 27'},
      // {'statusId': 2,'statusName': 'IN-ACTIVE','dateAdded': '2017-10-29T18: 58: 27','dateModified': '2017-10-29T18: 58: 27'},
      {'statusId': 3,'statusName': 'EDITED','dateAdded': '2017-10-29T18: 58: 27','dateModified': '2017-10-29T18: 58: 27'},
      {'statusId': 4,'statusName': 'DELETED','dateAdded': '2017-10-29T18: 58: 27','dateModified': '2017-10-29T18: 58: 27'},
      {'statusId': 5,'statusName': 'REVIEWED','dateAdded': '2017-10-29T18: 58: 27','dateModified': '2017-10-29T18: 58: 27'},
      {'statusId': 6,'statusName': 'RECORDED','dateAdded': '2017-11-20T11: 20: 45','dateModified': '2017-11-20T11: 20: 45'}
    ];
  user = {};
  contents = [];
   id= 0;
   title:  '';
  currntPlayerId= -9;
  audio = new Audio();
  selectedStatusId = null;
  previusStatusId = null;
  contentServiceObserver = null;
  content= {
    title:  '',
    editedCount: 0,
    liveCount: 0
  }
  breadcrumbs = [
    {url:  'wqdewd',
    params: {},
    label: '111111'
    },
    {url: 'wqdewd',
      params: {},
      label: '22222'
    },
    {url: 'wqdewd',
      params: {},
      label: '333333'
    }
  ]
  constructor(private route:  ActivatedRoute, private contentService:  ContentService, private router:  Router, private nodeService:  NodeService,  private channelService :  ChannelService) {

    this.breadcrumbs = [
      {url: 'wqdewd',
        params: {},
        label: '111111'
      },
      {url: 'wqdewd',
        params: {},
        label: '22222'
      },
      {url: 'wqdewd',
        params: {},
        label: '333333'
      }
    ];
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.title = params['title'];



      this.channelService.getChannelMetaData(params['id'] ).subscribe(data => {
        // console.log(' content added ', data);
        // console.log(' content added ', data['contentCountByStatus']);
        this.content.editedCount = data['contentCountByStatus'][3];
        this.content.liveCount = data['contentCountByStatus'][5];
        this.title = data['title'];



      });


      this.contentService.getContentBychannelId(params['id'], this.selectedStatusId).subscribe( successData =>{
        const status = {};
        for(const successDataKey in successData) {
          this.contents.push(successData[successDataKey]);
          status[successData[successDataKey].status['statusName']] = successData[successDataKey].status;
        }
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



  }


  play(url:  string, id:  any) {
    // console.log(url,id);
    if (url == null) return;
    if (this.audio.paused) {
      this.audio.src = url;
      this.audio.play();
      this.currntPlayerId = id;
    } else {
      this.currntPlayerId = 909999;
      this.audio.pause();
      console.log('--' + this.currntPlayerId);
    }
  }




  addContent(id:  string) {

   this.router.navigate(['/home/' + id + '/add-content' ]);

  }


  OnStatusSelect() {
    this.previusStatusId = this.selectedStatusId;
    this.contents = [];
    if( this.contentServiceObserver) this.contentServiceObserver.unsubscribe();

    this.contentServiceObserver =  this.contentService.getContentBychannelId(this.route.params['_value'].id, this.selectedStatusId).subscribe( successData =>{
      const status = {};
      this.contents = [];
      for(const successDataKey in successData) {
        this.contents.push(successData[successDataKey]);

        status[successData[successDataKey].status['statusName']] = successData[successDataKey].status;
      }

    });


  }


  naviagte(reload: boolean){
    if(reload) {
      // this.router.navigate(['/home/' + this.id + '/content?title=' + this.title]);
      let navigationExtras:   NavigationExtras =  {
        queryParams:    {
          'title':  this.title
        }
      };
      this.router.navigate(['/home/' + this.id + '/content'], navigationExtras);
    }else{
      this.router.navigate(['/home/channel']);
    }


  }

  editContent(ContentId:number){
      this.router.navigate(['/home/' + this.id + '/' + ContentId + '/edit']);
  }

  compareDate(d1, d2) {
    if( d1 && d2 ) {
      return   ( d1.substring(0, 18) != d2.substring(0, 18));
    }else {
      return false;
    }






    // if( (d1.split('T').length = 2) & (d2.split('T').length = 2))
    // {
    //  return d1.split('T')[0] !=   d2.split('T')[0];
    // }else{
    //  return  d1 != d2 ;
    // }

  }

  }




