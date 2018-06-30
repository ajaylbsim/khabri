import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from "./config/constants";

@Injectable()
export class ChannelService {

  constructor(private http: HttpClient){}

  getChannelByUserId(id) {
    return this.http.get(Constants.SERVER_URL + '/channelService/v2/channel/findByCreator/' + id);
  }
  // getCurrentChannel(){
  //   return this.currentChannelInfo;
  // }
  getChannelMetaData(id) {
    return  this.http.get(Constants.SERVER_URL + 'channelService/v2/channel/' + id  +  '/getChannelMetaData');

  }

}
