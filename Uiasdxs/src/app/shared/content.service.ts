import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ContentService {

  readonly rootUrl = 'http://139.59.36.228:8080/khabri-web-app/khabri/';

  constructor(private http: HttpClient){}

  getContentBychannelId(id){
    console.log("find all content by chaneel  id ---",id);

    return this.http.get(this.rootUrl+"/channelService/v2/channel/"+id+"/getAllContentForAdmin");
  }
}
