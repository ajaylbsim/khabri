import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpRequest, HttpResponseBase} from "@angular/common/http";

@Injectable()
export class ContentService {

  readonly rootUrl = 'http://139.59.36.228:8080/khabri-web-app/khabri/';

  constructor(private http: HttpClient){}

  getContentBychannelId(id){
    return this.http.get(this.rootUrl+"/channelService/v2/channel/"+id+"/getAllContentForAdmin");
  }
  pushImageToStorage(file: File, progress: {percentage: number},isAudio:boolean) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    let url = isAudio ? '/audio-content/upload/' :'/content/upload/';

    const req = new HttpRequest('POST',this.rootUrl+url +"1",formdata, {
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

  // pushAudioToStorage(file: File, progress: {percentage: number}) {
  //   const formdata: FormData = new FormData();
  //
  //   formdata.append('file', file);
  //
  //   const req = new HttpRequest('POST',this.rootUrl+'/content/upload/' +"1",formdata, {
  //     reportProgress: true,
  //     responseType: 'text',
  //   });
  //
  //   this.http.request(req).subscribe(event => {
  //     console.log(event);
  //     if (event.type === HttpEventType.UploadProgress) {
  //       progress.percentage = Math.round(100 * event.loaded / event.total);
  //       console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>  "+      progress.percentage );
  //
  //
  //     } else if (event instanceof HttpResponseBase) {
  //       progress['imageUrl'] = event.body as string;
  //     }
  //   });
  //
  //
  // }
}
