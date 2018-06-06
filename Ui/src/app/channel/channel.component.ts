import {Component, OnInit} from "@angular/core";
import {ChannelService} from "../shared/channel.service";



@Component({
  selector:'app-channel',
  templateUrl:'./channel.component.html',
  styleUrls:[]
})

export  class ChannelComponent implements OnInit {
  constructor(private channelService:ChannelService){}
  channels = [];
  ngOnInit(){

    this.channelService.getChannelByUserId(1).subscribe( successData =>{

      for (let successDataKey in successData) {
        this.channels.push(successData[successDataKey]);
        console.log(successData[successDataKey]);
      }


    });

  }


}
