import { Constants } from './../../shared/config/constants';
import { DataService } from './../../shared/services/data.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../../user/model/user';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserService } from './../../user/services/user.service';
import { Injectable } from '@angular/core';
import { Channel } from './../model/channel';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class ChannelService extends DataService {

  private channels: Array<Channel>;
  private selectedChannel: Channel;

  constructor(http: Http, private router: Router) {
    super(Constants.SERVER_URL + '/khabri/channelService/v2/channel' , http);
  }

  public getAllUserChannels() {
    const user: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user == null) {
      this.router.navigate(['login']);
    }
    return this.http.get(this.url + '/findByCreator/' + user['userId'].toString(), { headers : this.getHeaders()})
    .map(res => {
        return res.json();
    })
    .catch(this.handleError);
  }

  public setSelectedChannel(selectedChannel: Channel) {
      this.selectedChannel = selectedChannel;
  }

  public getSelectedChannel() {
    return this.selectedChannel;
  }

  private getHeaders() {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
