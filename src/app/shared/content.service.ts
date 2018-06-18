import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpRequest, HttpResponseBase} from "@angular/common/http";
import {Constants} from "./config/constants";
import {Observable} from "rxjs/Observable";
import {BadInput} from "../../../oldKhabriCode/src/app/shared/error/bad-input";
import {NotFoundError} from "../../../oldKhabriCode/src/app/shared/error/not-found-error";

@Injectable()
export class ContentService {

  // readonly rootUrl = 'http://139.59.36.228:8080/khabri-web-app/khabri/';

  constructor(private http: HttpClient){}

  getContentBychannelId(id){
    return this.http.get(Constants.SERVER_URL+"/channelService/v2/channel/"+id+"/getAllContentForAdmin");
  }
  pushImageToStorage(file: File, progress: {percentage: number},isAudio:boolean) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    let url = isAudio ? '/audio-content/upload/' :'/content/upload/';

    const req = new HttpRequest('POST',Constants.SERVER_URL+url +"1",formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    this.http.request(req).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        progress.percentage = Math.round(100 * event.loaded / event.total);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>  "+      progress.percentage );


      } else if (event instanceof HttpResponseBase) {
        if(isAudio){
          progress['audioUrl'] = event['body'] as string;
        }else{
          progress['imageUrl'] = event['body'] as string;
        }

      }
    });


  }

  public findAllTags() {
    return this.http.get(Constants.SERVER_URL + '/tagService/v2/category/tag/findAll')
      .map(res => {
        return res;
      });//.catch(this.handleError);
  }



  public findAllStatus(userId:number,channelId:number) {
    return this.http.get(Constants.SERVER_URL + '/userService/v2/user/' +userId+'/channel/' +channelId +'/getAllowedStatus')
      .map(res => {
        return res;
      });
  }



  protected handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }

    if (error.status === 404) {
     return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new NotFoundError());
  }
}


