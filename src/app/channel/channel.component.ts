import {Component, OnInit} from "@angular/core";
import {ChannelService} from "../shared/channel.service";
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {NodeService} from "../shared/NodeService";



@Component({
  selector:'app-channel',
  templateUrl:'./channel.component.html',
  styleUrls:[]
})

export  class ChannelComponent implements OnInit {
  constructor(private channelService:ChannelService,private router: Router, private nodeService: NodeService){}
  user = {};
  channels = [];
  statusList = [
    {"statusId":3,"statusName":"EDITED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
    {"statusId":5,"statusName":"REVIEWED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
  ];
  ngOnInit(){
    this.nodeService.node$.subscribe(n => {
      this.statusList = n['statusList'];
      this.user = n;
    });

    console.log('this is logged in user ', this.user);
    this.channelService.getChannelByUserId(1).subscribe( successData =>{

      for (let successDataKey in successData) {
        this.channels.push(successData[successDataKey]);
        console.log(successData[successDataKey]);
      }


    });


  }

  move(id,title){
    console.log(id,title);
    let navigationExtras: NavigationExtras = {
      queryParams: {
  'title':title}
    };

    this.router.navigate(['/home/'+id+'/content'],navigationExtras);

  }


}
