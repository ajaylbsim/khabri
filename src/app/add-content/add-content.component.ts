import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TagModel} from "ngx-chips/core/accessor";
import {ContentService} from "../shared/content.service";
import {Content, TagMenu} from "../model/content";
import {TagInputForm} from "ngx-chips";

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  user={};
  content= new Content();
  fileProgressStatus = 0;
  fileToUpload:File;
  audioFileToUpload:File;
  priorityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  itemsAsObjects = [];
  locationsAsObjects=[];
  tagList:object[];
  statusList: object[];
  imageprogress: {percentage: number} = {percentage: 0};
  audioContent: {percentage: number} = {percentage: 0};
  audio = new Audio();

  constructor(private contentService:ContentService) { }
  // fileToUpload: File = null;

  ngOnInit() {
    this.itemsAsObjects =[ {id: 0, name: 'Angular'}, {id: 1, name: 'React'}];
    this.locationsAsObjects = [];
    this.contentService.findAllTags().subscribe(data=>{
     console.log(">>>>>>>>>>> ",data);
     this.tagList =  <Array<any>>data;

   });
    this.contentService.findAllStatus(1,1).subscribe(data=>{
      console.log(">>>>>>>>>>>statusList  ",data);
      this.statusList =  <Array<any>>data;

    });

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
    console.log(">>>>>>>>>>>tag  ",tag);
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

  public addContent(form){
    console.log("content      ",this.content);
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
