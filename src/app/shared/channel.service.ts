import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChannelService {

  readonly rootUrl = 'http://139.59.36.228:8080/khabri-web-app/khabri/';

  constructor(private http: HttpClient){}

  getChannelByUserId(id){
return this.http.get(this.rootUrl+"/channelService/v2/channel/findByCreator/"+id);
  }
}
