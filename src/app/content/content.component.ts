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
  content={
    title:'test!'
  }
  constructor(private route :ActivatedRoute,private contentService:ContentService) { }

  ngOnInit() {

    console.log(  this.route.params['_value'].id)



    this.contentService.getContentBychannelId(this.route.params['_value'].id).subscribe( successData =>{

      for (let successDataKey in successData) {
        this.contents.push(successData[successDataKey]);
        console.log(successData[successDataKey]);
      }


    });

  }

}
