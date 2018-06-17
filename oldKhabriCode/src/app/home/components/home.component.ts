import { UserService } from './../../user/services/user.service';
import { ChannelService} from './../../channel/services/channel.service';
import { Component, OnInit } from '@angular/core';
import { Channel } from './../../channel/model/channel';
import { Router} from '@angular/router';

@Component({
  selector: 'ngx-app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  private channels: Array<Channel> = new Array<Channel>();

  constructor(private router: Router, private userService: UserService, private channelService: ChannelService) { }

  ngOnInit() {
    this.initialChannelList();
  }

  public selectChannel(channel: Channel) {
    this.channelService.setSelectedChannel(channel);
    sessionStorage.setItem('selectedChannel', JSON.stringify(channel));
    this.router.navigate(['content']);
  }

  public initialChannelList() {
    this.channelService.getAllUserChannels().subscribe(
      (channels) => {
        this.channels = channels;
      });
  }


}
