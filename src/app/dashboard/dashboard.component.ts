import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.recordForm = this.formBuilder.group({
      volume: ''
    });
  }

  saveRecord() {
    debugger
  }

}
