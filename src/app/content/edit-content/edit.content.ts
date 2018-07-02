
import {Component, OnInit, ViewChild} from "@angular/core";
import {ContentService} from "../../shared/content.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NodeService} from "../../shared/NodeService";
import {ChannelService} from "../../shared/channel.service";
import {ToastrService} from "ngx-toastr";
import {Content, StatusMenu} from "../../model/content";

@Component({
  selector:'app-edit-content',
  templateUrl:'./edit.content.html'
})

export  class EditContentComponent implements OnInit {
  // @ViewChild('myInputVariable')
  // myInputVariable: any;
  user= {};
  content: Content;
  fileToUpload: File;
  audioFileToUpload: File;
  priorityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 35];
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
  toast = {};
   constructor(private contentService: ContentService, private router: Router, private route: ActivatedRoute,
                      private nodeService: NodeService, private channelService : ChannelService, private toastr: ToastrService){};

  ngOnInit() {
    var thisClass = this;


  this.nodeService.node$.subscribe(n => {

  this.statusList =  [
  {'statusId':3,'statusName':'EDITED'},
  {'statusId':4,'statusName':'DELETED'},
  {'statusId':5,'statusName':'REVIEWED'},
  {'statusId':6,'statusName':'RECORDED'}
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
  // console.log(' content added ', params);


  this.channelService.getChannelMetaData(params['id']).subscribe(data => {
    this.tagList = data['tags'];
  });

  this.channelService.getContentById(params['contentId']).subscribe(data => {
    this.content  = <Content> data;
     this.content['channel'] = { channelId: params['id']};

    if(data['audioUrl']){
      this.audioContent['audioUrl'] = data['audioUrl'];
      this.audioContent['percentage'] = 100;
      this.audioContent['paused'] = true;
    }

    if(data['imageUrl']) {
      this.imageprogress['imageUrl'] = data['imageUrl'];
      this.imageprogress['percentage'] = 100;
    }


    this.selectedItems = data['tags'];
    console.log(' content added ', data);

    this.statusList.forEach(function (item) {
      if(item['statusId'] == data['status']['statusId']) {
        thisClass.content['status']  =  <StatusMenu>item;
      }
    });



    //
    // // console.log(this.myInputVariable.nativeElement);
    //  // this.myInputVariable.nativeElement.value = data.audioUrl;
    //    // console.log(this.myInputVariable.nativeElement.files);
    //  let f = new File([''], data['audioUrl']);
    //  // let files = new FileList(f);
    //
    // // myfile.setName(data.audioUrl);
    // this.myInputVariable.nativeElement.files[0] = f;

  });



});



}
OnSubmit( userRegistrationForm: any) {

  this.content['audioUrl'] = (this.audioContent.audioUrl);
  this.content['imageUrl'] = (this.imageprogress.imageUrl);
  this.content['tags']    =  (this.selectedItems);
  console.log( this.content);
  this.toast = this.toastr.success('Edited successfully !');
  // this.contentService.addContent(this.content).subscribe(data => {
  //   this.toast = this.toastr.success('Edited successfully !');
  //   setTimeout(() => {  this.router.navigate(['/home/' + this.content['channel']['channelId'] + '/content']); }, 1000);
  //
  // });
}

onCancel(userRegistrationForm:any) {
  userRegistrationForm.submitted  = false;
  this.router.navigate(['/home/' + this.content['channel']['channelId'] + '/content'], { queryParams: {} } );
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
