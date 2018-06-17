import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TagModel} from "ngx-chips/core/accessor";
import {ContentService} from "../shared/content.service";

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  user={};
  content={};
  fileProgressStatus = 0;
  fileToUpload:File;
  audioFileToUpload:File;
  statusList = [
    {"statusId":3,"statusName":"EDITED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
    {"statusId":5,"statusName":"REVIEWED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
    // {"statusId":4,"statusName":"DELETED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"}
  ];
  itemsAsObjects = [{id: 0, name: 'Angular'}, {id: 1, name: 'React'}];
  locationsAsObjects=[];
  imageprogress: {percentage: number} = {percentage: 0};
  audioContent: {percentage: number} = {percentage: 0};
  audio = new Audio();

  constructor(private contentService:ContentService) { }
  // fileToUpload: File = null;

  ngOnInit() {
    // this. fileToUpload = new File();
    this.itemsAsObjects = [{id: 0, name: 'Angular'}, {id: 1, name: 'React'}];
    this.locationsAsObjects = [];
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.contentService.pushImageToStorage(this.fileToUpload,this.imageprogress,false);
  }

  handleAudioInput(files: FileList) {
    this.audioFileToUpload = files.item(0);
    console.log(">>>>>>>>>>> this.audioFileToUpload   ", this.audioFileToUpload );

    this.contentService.pushImageToStorage(this.audioFileToUpload,this.audioContent,true);
  }



  public options = {
    readonly: undefined,
    placeholder: '+ Tag'
  };

  public onAdding(tag) {
    console.log(">>>>>>>>>>>tag  ",this);
    let arr = tag.split("::");
    let nm = "lat:"+arr[0]+" long:"+arr[1];
    console.log(">>>>>>>>>>>  ",this['_items'].push({id:1,name:nm}));
    this['inputTextValue'] ="";

    return tag;
  };

  public onAdd(item) {
    console.log('tag added: value is ' + item);
  }

  public onRemove(item) {
    console.log('tag removed: value is ' + item);
  }

  public onSelect(event:any) {
    console.log('tag selected: value is ' + event);
  }

  public onFocus(item) {
    console.log('input focused: current value is ' + item);
  }


  play(url:string){
    console.log(">>>>>>>>>>>url>>>>",this.audioContent);
    if(url == null) return;

    if (this.audio.paused) {
      this.audio.src = url;
      this.audio.play();
    } else {
      this.audio.pause();
      //this.audio.paused = false;
    }
  }


}
