import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  records: FirebaseListObservable<any[]>;
  recordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.records = this.af.database.list('/records');
    this.recordForm = this.formBuilder.group({
      volume: ''
    });
  }

  saveRecord() {
    debugger
    this.records.push(this.recordForm.value);
  }

}
