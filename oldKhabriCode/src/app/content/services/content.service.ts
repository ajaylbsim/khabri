import { Router } from '@angular/router';
import { User } from './../../user/model/user';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../shared/config/constants';
import { DataService } from './../../shared/services/data.service';
import { ChannelService } from './../../channel/services/channel.service';
import { UserService } from './../../user/services/user.service';
import { Content, ContentLocationRelation, ContentLocationId } from './../model/content';
import { FileUploader } from 'ng2-file-upload';

import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { ResponseContentType} from '@angular/http';

@Injectable()
export class ContentService extends DataService {

  constructor(private channelService: ChannelService,
    private userService: UserService, http: Http, private httpClient: HttpClient,
    private router: Router) {
    super(Constants.SERVER_URL + '/khabri/channelService/v2/content', http);
  }

  public getAllChannelContent() {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.channelService.url + '/' +
    this.channelService.getSelectedChannel()['channelId'] + '/getAllContentForAdmin' , { headers : headers})
    .map(res => {
      return res.json();
    })
    .catch(this.handleError);
  }

  pushImageToStorage(file: File, progress: {percentage: number}, content: Content) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', Constants.SERVER_URL + '/khabri/content/upload/' +
      this.channelService.getSelectedChannel()['channelId'], formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    this.httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        content['imageUrl'] = event.body as string;
      }
    });
  }

  pushContentToStorage(file: File, progress: {percentage: number}, content: Content) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', Constants.SERVER_URL +
      '/khabri/audio-content/upload/' + this.channelService.getSelectedChannel()['channelId'], formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    this.httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        content['audioUrl'] = event.body as string;
      }
    });
  }

  public findAllTags() {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(Constants.SERVER_URL + '/khabri/tagService/v2/category/tag/findAll' , { headers : headers})
    .map(res => {
      return res.json();
    })
    .catch(this.handleError);
  }

  public findAllLocations() {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(Constants.SERVER_URL + '/khabri/locationService/v2/location/findAll' , { headers : headers})
    .map(res => {
      return res.json();
    })
    .catch(this.handleError);
  }

  public findAllStatus() {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const user: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user == null) {
      this.router.navigate(['login']);
    }
    return this.http.get(Constants.SERVER_URL + '/khabri/userService/v2/user/' +
    user['userId'].toString() + '/channel/' + this.channelService.getSelectedChannel()['channelId'].toString()
    + '/getAllowedStatus' , { headers : headers})
    .map(res => {
      return res.json();
    })
    .catch(this.handleError);
  }

  public storeContent(content: Content) {
    this.mapChannel(content);
    this.mapLocation(content);
    this.mapTags(content);
    this.addSourceAndFullStoryUrl(content);
    this.addContent(content).subscribe(
    (updatedContent: Content) => {
    });
  }

  addSourceAndFullStoryUrl(content) {
    if (content['channel']['channelId'] === 1 || content['channel']['channelId'] === 2) {
      content['source'] = 'newstrack';
    } else {
      content['source'] = 'getkhabri';
      content['sourceUrl'] = 'www.getkhabri.com';
    }
  }

  mapChannel(content) {
    content['channel'] = { channelId: this.channelService.getSelectedChannel()['channelId']};
  }
  mapLocation(content) {
    const locationList: any[] = [];
    content['contentLocationRelation'].forEach(location => {
      locationList.push({id: {location: {locationId: location['locationId']},
      content: {contentId: content['contentId']}}, proximity: location['proximity'], status: {statusId: 1}});
    });
    content['contentLocationRelation'] = locationList;

  }

  mapTags(content) {
    const tagList: any[] = [];
    content['tags'].forEach(tag => {
      tagList.push({tagId: tag['tagId']});
    });
    content['tags'] = tagList;
  }

  addContent(resource) {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Constants.SERVER_URL  +
      '/khabri/contentService/v2/content/add',
      JSON.stringify(resource) , { headers : headers})
      .map(response => response.json())
      .catch(this.handleError);
  }

  getImage(url: string) {
    return Observable.create(observer => {
     const req = new XMLHttpRequest();
     req.open('get', url);
     req.responseType = 'arraybuffer';
     req.onreadystatechange = function() {
       if (req.readyState === 4 && req.status === 200) {
         observer.next(req.response);
         observer.complete();
       }
     };
     req.send();
    });
   }
}
