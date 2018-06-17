import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css'],
})
export class ContentFormComponent implements OnInit {

  @Input() contentForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }
}
