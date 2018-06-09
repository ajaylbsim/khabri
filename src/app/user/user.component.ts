import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  _activeChild = {};

  constructor(private activeRouter:ActivatedRoute) { }

  ngOnInit() {
    if(this.activeRouter.children&&this.activeRouter.children.length&&this.activeRouter.children[0]){
      this._activeChild = this.activeRouter.children[0].component;
    }

  }

}
