import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from "./config/constants";

@Injectable()
export class ChannelService {

  constructor(private http: HttpClient){}

  getChannelByUserId(id,statusId) {
    let url = '';
    if( statusId ){
      url = Constants.SERVER_URL + '/channelService/v2/channel/findByCreator/' + id +'?statusId=' + statusId;

    }else{
      url = Constants.SERVER_URL + '/channelService/v2/channel/findByCreator/' + id;
    }
    return this.http.get(url);
  }

  getChannelMetaData(id) {
    return  this.http.get(Constants.SERVER_URL + 'channelService/v2/channel/' + id  +  '/getChannelMetaData');

  }

  getContentById(id) {
    return  this.http.get(Constants.SERVER_URL + '/contentService/v2/content/findById/' + id);

  }

}
