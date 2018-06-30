import { Component, OnInit, Input } from '@angular/core';
import {ContentService} from '../shared/content.service';
import {Content} from '../model/content';
import {ActivatedRoute, Router} from '@angular/router';
import {NodeService} from "../shared/NodeService";
import {ChannelService} from "../shared/channel.service";

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  user= {};
  content: Content;
  fileToUpload: File;
  audioFileToUpload: File;
  priorityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  locationsAsObjects= [];
  tagList: object[];
  statusList: object[];
  imageprogress: {percentage: number, imageUrl: string} = {percentage: 0, imageUrl: ''};
  audioContent: {percentage: number, audioUrl: string} = {percentage: 0, audioUrl: '' };
  audio = new Audio();
  selectedItems = [];
  dropdownSettings = {};
  public options = {
    readonly: undefined,
    placeholder: '+ Tag'
  };

  constructor(private contentService: ContentService, private router: Router, private route: ActivatedRoute, private nodeService: NodeService, private channelService : ChannelService) { }
  ngOnInit() {

    this.nodeService.node$.subscribe(n => {
      console.log('shared data are', n);
      this.statusList =  [
        {'statusId':1,'statusName':'ACTIVE','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
        {'statusId':2,'statusName':'IN-ACTIVE','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
        {'statusId':3,'statusName':'EDITED','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
        {'statusId':4,'statusName':'DELETED','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
        {'statusId':5,'statusName':'REVIEWED','dateAdded':'2017-10-29T18:58:27','dateModified':'2017-10-29T18:58:27'},
        {'statusId':6,'statusName':'RECORDED','dateAdded':'2017-11-20T11:20:45','dateModified':'2017-11-20T11:20:45'}
      ];
      this.user = n['user'];
    });

    this.content = new Content();
    this.selectedItems = [
    ];
    this.locationsAsObjects = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'tagId',
      textField: 'tagName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 30,
      allowSearchFilter: true
    };

    this.route.params.subscribe(params => {
      console.log(' content added ', params['id']);
      this.content.channel = { channelId: params['id']};

      this.channelService.getChannelMetaData(params['id']).subscribe(data => {
        this.tagList = data['tags'];
      });
    });



  }
  OnSubmit( userRegistrationForm: any) {
      this.content.setAudioUrl(this.audioContent.audioUrl);
      this.content.setImageUrl(this.imageprogress.imageUrl);
      this.content.setTags(this.selectedItems);

     this.contentService.addContent(this.content).subscribe(data => {
       console.log(' content added ', data);
       this.router.navigate(['/home/' + this.content.channel['channelId'] + '/content']);
     });
  }

  onCancel(userRegistrationForm:any) {
    userRegistrationForm.submitted  = false;
    this.router.navigate(['/home/' + this.content.channel['channelId'] + '/content'], { queryParams: {} } );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.contentService.pushImageToStorage(this.fileToUpload, this.imageprogress, false);
  }

  handleAudioInput(files: FileList) {
    this.audioFileToUpload = files.item(0);
    this.contentService.pushImageToStorage(this.audioFileToUpload, this.audioContent, true);
  }





  public onAdding(tag) {
    this['inputTextValue'] = '';
    return tag;
  }

  // public onAdd(item) {
  //   console.log('tag added: value is ' + item);
  // }
  //
  // public onRemove(item) {
  //   console.log('tag removed: value is ' + item);
  // }
  //
  // public onSelect(event: any) {
  //   console.log('tag selected: value is ' + event);
  // }
  //
  // public onFocus(item) {
  //   console.log('input focused: current value is ' + item);
  // }

  public addContent(form) {
  }

  play(url: string ) {
    if (url == null) { return; }

    if (this.audio.paused) {
      this.audio.src = url;
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  onTagSelect( item: any ) {
    console.log(item, this.selectedItems);
  }
  onSelectAllTags(items: any ) {
    console.log(items);
  }

}
