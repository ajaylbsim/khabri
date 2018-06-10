import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentService} from "../shared/content.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  contents =[];
   id=0;
   title:"";
  currntPlayerId=-9;
  audio = new Audio();

  content={
    title:'test!'
  }
  constructor(private route :ActivatedRoute,private contentService:ContentService) { }
  ngOnInit() {
    this.audio = new Audio();

    console.log(  this.route.params['_value'].id)

this.id = this.route.params['_value'].id;

    // console.log(  this.route.params);

    this.route.queryParams.subscribe(params=>{
      this.title = params.title;
    })







    this.contentService.getContentBychannelId(this.route.params['_value'].id).subscribe( successData =>{

      for (let successDataKey in successData) {
        this.contents.push(successData[successDataKey]);
        //console.log(successData[successDataKey]);
      }


    });

  }

  play(url:string,id:any){
    console.log(url);

    //  this.audio = new Audio();
    this.audio.src = url;
    // this.audio.play();
    if (this.audio.paused) {
      console.log(id);
      this.audio.play();
      this.currntPlayerId = id;
    } else {
      this.audio.pause();
      this.currntPlayerId = -9;
    }
  }

}
