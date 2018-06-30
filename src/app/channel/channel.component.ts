import  {Component,  OnInit} from '@angular/core';
import  {ChannelService} from '../shared/channel.service';
import  {ActivatedRoute,  NavigationExtras,  Router} from '@angular/router';
import  {NodeService} from '../shared/NodeService';



@Component( {
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: []
})

export  class ChannelComponent implements OnInit  {
  constructor(private channelService: ChannelService, private router:  Router,  private nodeService:  NodeService) {}
  user =  {};
  channels = [];
  statusList = [ {'statusId': 1, 'statusName': 'ACTIVE', 'dateAdded': '2017-10-29T18: 58: 27', 'dateModified': '2017-10-29T18: 58: 27'},
                 {'statusId': 2, 'statusName': 'IN-ACTIVE', 'dateAdded': '2017-10-29T18: 58: 27', 'dateModified': '2017-10-29T18: 58: 27'}
               ];
  selectedStatus= 1;
  ngOnInit() {

    this.nodeService.node$.subscribe(n =>  {
      this.user = n['user'];
      this.channelService.getChannelByUserId(this.user['userId'],this.selectedStatus).subscribe( successData => {
        for(let successDataKey in successData)  {
          this.channels.push(successData[successDataKey]);
          // console.log(successData[successDataKey]);
        }
      });

    });




  }

  move(id, title) {
    let navigationExtras:  NavigationExtras =  {
      queryParams:   {
      'title': title
      }
    };
    this.router.navigate(['/home/' + id + '/content'], navigationExtras);
  }


  OnStatusSelect(event:  any)  {
    console.log('selectedStatusId ', this.selectedStatus, event);
    this.contents = [];
    this.channelService.getChannelByUserId(this.user['userId'],this.selectedStatus).subscribe( successData => {
      this.channels = [];
      for(let successDataKey in successData)  {
        this.channels.push(successData[successDataKey]);
        console.log(successData[successDataKey]);
      }
    });
  }





}
