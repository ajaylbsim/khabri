import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { LocationMenu } from './../../user/model/user';
import { ContentService } from './../services/content.service';
import { UserService } from './../../user/services/user.service';
import { ChannelService } from './../../channel/services/channel.service';
import { Content, TagMenu, StatusMenu, ContentLocationRelation, ContentLocationId } from './../model/content';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormsModule,
         ReactiveFormsModule, Validators } from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Ng2SmartTableModule, LocalDataSource, ViewCell } from 'ng2-smart-table';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { concat } from 'rxjs/observable/concat';
import { Router } from '@angular/router';
import { Channel } from 'app/channel/model/channel';




@Component({
  selector: 'ngx-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {

  @ViewChild('contentImage') content_Image;
  @ViewChild('contentAudio') content_Audio;

  contents: Array<Content>;
  settings: any;
  source: LocalDataSource;
  contentForm: FormGroup;
  isSelectedContent: boolean= false;
  selectedContent: Content;
  timerSubscription: any;
  priorityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  status: StatusMenu[];
  tags: TagMenu[];
  locations: LocationMenu[];
  contentImageFile: File;
  contentAudioFile: File;
  imageprogress: {percentage: number} = {percentage: 0};
  audioprogress: {percentage: number} = {percentage: 0};

  constructor(private contentService: ContentService,
              private channelService: ChannelService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router) {
              this.selectedContent = new Content();
              this.createForm();
  }

  ngOnInit() {
    if (this.channelService.getSelectedChannel() === undefined) {
      const channel: Channel = JSON.parse(sessionStorage.getItem('selectedChannel'));
      if  (channel !== undefined) {
        this.channelService.setSelectedChannel(channel);
      } else {
        this.router.navigate(['login']);
      }
    }
    this.initDropdowns();
    this.initializeContentList();
    this.settings = {
      pager: {
        display: true,
        perPage: 15,
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        },
      columns: {
        contentId: {
          title: 'ID',
        },
        title: {
          title: 'Title',
        },
        statusName: {
          title: 'Status',
          filter: {
            type: 'list',
            config: {
              selectText: 'ALL',
              list: [
                { value: 'EDITED', title: 'EDITED' },
                { value: 'DELETED', title: 'DELETED' },
                { value: 'RECORDED', title: 'RECORDED' },
                { value: 'REVIEWED', title: 'REVIEWED' },
              ],
            },
          },
        },
        priority: {
          title: 'Priority',
        },
        channelName: {
          title: 'Channel',
        },
        dateAdded: {
          title: 'Date Added',
        },
        dateModified: {
          title: 'Date Modified',
        },
      },
    };

  }

  public initializeContentList() {
    this.contentService.getAllChannelContent().subscribe(
      (contents: Array<Content>) => {
        this.contents = contents;
        this.contents.forEach(
          (content: Content) => {content['statusName'] = content['status']['statusName'];
          content['channelName'] = this.channelService.getSelectedChannel()['title'];
          const dateAdded: Date = new Date(content['dateAdded']);
          content['dateAdded'] = new Date(Date.UTC(dateAdded.getFullYear(), dateAdded.getMonth(), dateAdded.getDate(),
          dateAdded.getHours(), dateAdded.getMinutes(), dateAdded.getSeconds(), dateAdded.getMilliseconds()));
          const dateModified: Date = new Date(content['dateModified']);
          content['dateModified'] = new Date(Date.UTC(dateModified.getFullYear(), dateModified.getMonth(),
          dateModified.getDate(), dateModified.getHours(), dateModified.getMinutes(),
          dateModified.getSeconds(), dateModified.getMilliseconds())); });
        this.source = new LocalDataSource(this.contents);
        this.source.setSort([{ field: 'dateAdded', direction: 'desc' }]);
        this.source.setFilter([{ field: 'statusName', search: 'EDITED' }]);
        this.subscribeToData();
      });
  }

  public onUserRowSelect($event) {
    this.selectedContent = Object.assign({}, $event.data);
    this.isSelectedContent = true;
    this.setTags();
    this.setContentLocationRelation();
    // this.contentForm.setValue({
    //   contentId: this.selectedContent['contentId']
    // }
    // );
  }

  createForm() {
    this.contentForm = this.fb.group({
      contentId: [],
      source: [],
      audioDuration: [],
      priority: [],
      channel: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [],
      audioUrl: [],
      sourceUrl: [],
      contentLocationRelation: this.fb.array([]),
      tags: this.fb.array([this.createTag()]),
      status: [],
    });
  }
  onSubmit({ value, valid }: { value: Content, valid: boolean }) {
    this.isSelectedContent = false;
    this.transformPostDataAndStore(value);
    this.clearForm();
  }

  getTags(): FormArray {
    return <FormArray>this.contentForm.get('tags') as FormArray;
  }


  setTags() {
    const tagFGs = this.selectedContent['tags'].map(tag => this.fb.group(tag));
    const tagFormArray = this.fb.array(tagFGs);
    this.contentForm.setControl('tags', tagFormArray);
  }

  getContentLocationRelation(): FormArray {
    return <FormArray>this.contentForm.get('contentLocationRelation') as FormArray;
  }

  setContentLocationRelation() {
    const locationFGs = this.selectedContent['contentLocationRelation']
    .map(contentLocation => this.createLocation(contentLocation['id']['content']['contentId'],
    contentLocation['id']['location']['locationId'], contentLocation['proximity']));
    const locationFormArray = this.fb.array(locationFGs);
    this.contentForm.setControl('contentLocationRelation', locationFormArray);
  }

  addTag(): void {
    const control = <FormArray>this.contentForm.controls['tags'];
    if (control.length === 0) {
      control.push(this.createTag());
    }
  }

  addLocation(): void {
    const control = <FormArray>this.contentForm.controls['contentLocationRelation'];
    if (control.length === 0) {
      control.push(this.createLocation());
    }
  }

  createTag(): FormGroup {
    return this.fb.group({
      tagId: [],
      tagName: [],
    });
  }

  createLocation(conId?, locId?, proximity?): FormGroup {
    if (conId == null) {
      conId = '';
    }
    if (locId == null) {
      locId = '';
    }
    if (proximity == null) {
      proximity = 0;
    }
    return this.fb.group({
      locationId: [locId],
      proximity: [proximity],
    });
  }

  addContent() {
    this.isSelectedContent = true;
    this.clearForm();
    this.createForm();
    this.initializeContentList();
  }

  cancel() {
    this.isSelectedContent = false;
    this.clearForm();
    this.initializeContentList();
  }

  clearForm() {
    this.imageprogress.percentage = 0;
    this.audioprogress.percentage = 0;
    this.contentImageFile = undefined;
    this.contentAudioFile = undefined;
  }

  selectImage($event) {
    const file = $event.target.files.item(0);

    if (file.type.match('image/jpg') || file.type.match('image/png') || file.type.match('image/jpeg')) {
      this.contentImageFile = file;
    } else {
      alert('invalid format! Please upload jpg/jpeg/png format');
    }
  }

  selectAudio($event) {
    const file = $event.target.files.item(0);

    if (file.type.match('audio/mp3')) {
      this.contentAudioFile = file;
    } else {
      alert('invalid format! Please upload mp3 format');
    }
  }


  uploadImage() {
    this.imageprogress.percentage = 0;
    if (this.contentImageFile) {
      this.contentService.pushImageToStorage(this.contentImageFile, this.imageprogress, this.selectedContent);
      this.contentImageFile = undefined;
    } else {
      this.contentService.getImage(this.selectedContent['imageUrl']).subscribe(imageData => {
        const blob = new Blob([imageData], {type: 'image/jpg'});
        blob['lastModifiedDate'] = new Date();
        blob['name'] = 'temp-flie';
        this.contentService.pushImageToStorage(blob as File, this.imageprogress, this.selectedContent);
      });
    }
  }

  imageUploadProgress() {
    if (this.imageprogress && this.imageprogress.percentage > 0 && this.imageprogress.percentage <= 100) {
        return true;
    } else {
        return false;
    }
  }

  audioUploadProgress() {
    if (this.audioprogress && this.audioprogress.percentage > 0 && this.audioprogress.percentage <= 100) {
        return true;
    } else {
        return false;
    }
  }

   isSelectedImage() {
    if ((this.selectedContent && ((this.selectedContent['imageUrl'] !== undefined)
    && this.selectedContent['imageUrl'] !== ''))  || this.contentImageFile) {
        return true;
    } else {
        return false;
    }
  }

  uploadAudio() {
    this.audioprogress.percentage = 0;
    this.contentService.pushContentToStorage(this.contentAudioFile, this.audioprogress, this.selectedContent);
  }

  initDropdowns() {
    this.tags = this.channelService.getSelectedChannel()['tags'];

    this.contentService.findAllStatus().subscribe(
      (status: Array<StatusMenu>) => {
          this.status = status;
      });

    this.contentService.findAllLocations().subscribe(
        (locations: Array<LocationMenu>) => {
            this.locations = locations;
        });
  }

  transformPostDataAndStore(content: Content): any {
    this.contentService.storeContent(content);
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(60000).first().subscribe(() => this.initializeContentList());
}

  validateForm() {
    if (!this.contentForm.get('status').pristine) {
      const statusControl = this.contentForm.get('status').value;
      if (statusControl['statusId'] === 5) { // REVIEWED
        if (this.selectedContent['audioUrl'] !== undefined
        && this.selectedContent['audioUrl'] !== ''
        && this.selectedContent['audioUrl'] !== null
        && this.contentForm.get('imageUrl').value !== ''
        && this.selectedContent['imageUrl'] !== null
        && this.contentForm.get('title').value !== ''
        && this.contentForm.get('description').value !== ''
        && this.selectedContent['priority'] !== undefined
        && this.selectedContent['priority'] !== null
        && this.contentForm.get('tags').value[0]['tagId'] !== null) {
          return true;
        } else {
          return false;
        }
      } else if (statusControl['statusId'] === 3) { // EDITED
        if (this.contentForm.get('title').value !== ''
      && this.contentForm.get('description').value !== ''
      && this.selectedContent['imageUrl'] !== ''
      && this.selectedContent['imageUrl'] !== null
      && this.selectedContent['imageUrl'] !== undefined
      && this.selectedContent['source'] !== null
      && this.contentForm.get('source').value !== ''
      && this.selectedContent['priority'] !== undefined
      && this.selectedContent['priority'] !== null
      && this.contentForm.get('tags').value[0]['tagId'] !== null) {
          return true;
        } else {
          return false;
        }

      } else if (statusControl['statusId'] === 6) { // RECORDED
        if (this.selectedContent['audioUrl'] !== undefined
        && this.selectedContent['audioUrl'] !== ''
        && this.selectedContent['audioUrl'] !== null
        && this.contentForm.get('imageUrl').value !== ''
        && this.selectedContent['imageUrl'] !== null
        && this.contentForm.get('title').value !== ''
        && this.contentForm.get('description').value !== ''
        && this.selectedContent['priority'] !== undefined
        && this.selectedContent['priority'] !== null
        && this.contentForm.get('tags').value[0]['tagId'] !== null) {
          return true;
        } else {
          return false;
        }
      } else if (statusControl['statusId'] === 4) { // DELETED
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }




}





