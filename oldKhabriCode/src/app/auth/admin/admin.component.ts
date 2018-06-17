import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  orders: any[];

  constructor() { }

  ngOnInit() {
  }
}
