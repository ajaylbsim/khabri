import {Component, OnInit} from "@angular/core";
import {ChannelService} from "../shared/channel.service";
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';



@Component({
  selector:'app-channel',
  templateUrl:'./channel.component.html',
  styleUrls:[]
})

export  class ChannelComponent implements OnInit {
  constructor(private channelService:ChannelService,private router: Router){}
  channels = [];
  ngOnInit(){

    this.channelService.getChannelByUserId(1).subscribe( successData =>{

      for (let successDataKey in successData) {
        this.channels.push(successData[successDataKey]);
        // console.log(successData[successDataKey]);
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
