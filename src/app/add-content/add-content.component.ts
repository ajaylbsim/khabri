import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TagModel} from "ngx-chips/core/accessor";

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  user={};
  content={};
  fileProgressStatus = 0;
  fileToUpload= {"name":""};
  statusList = [
    {"statusId":3,"statusName":"EDITED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
    {"statusId":5,"statusName":"REVIEWED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"},
    // {"statusId":4,"statusName":"DELETED","dateAdded":"2017-10-29T18:58:27","dateModified":"2017-10-29T18:58:27"}
  ];
  itemsAsObjects = [{id: 0, name: 'Angular'}, {id: 1, name: 'React'}];
  locationsAsObjects=[];

  constructor() { }
  // fileToUpload: File = null;

  ngOnInit() {
    this. fileToUpload= {"name":""};
    this.itemsAsObjects = [{id: 0, name: 'Angular'}, {id: 1, name: 'React'}];
    this.locationsAsObjects = [];
  }


  handleFileInput(files: FileList) {
    let obj = Observable.interval(100).take(100).do(i => console.log("hello "+i));
    this.fileToUpload = files.item(0);
    console.log("hello ",  this.fileToUpload);


    let objhh =  obj.subscribe(i => {
      this.fileProgressStatus = this.fileProgressStatus +10;

      if( this.fileProgressStatus >100) objhh.unsubscribe();
    }

  );

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

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'your-destination-url';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData, { headers: yourHeadersConfig })
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }


}
