import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  list: Observable<any[]>;
  records: FirebaseListObservable<any[]>;
  categories: Observable<any[]>;
  categoriesRef: FirebaseListObservable<any[]>;
  recordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public af: AngularFire
  ) { }

  ngOnInit() {
    this.af.auth.take(1).subscribe((user: FirebaseAuthState) => {
      this.records = this.af.database.list(`/account/${user.uid}/history`);
      this.list = this.records.map(list => list.reverse());
      this.categoriesRef = this.af.database.list(`/account/${user.uid}/categories`, {
        query: {
          orderByChild: 'usedCount'
        }
      });
      let connect = this.categoriesRef.publishReplay(1);
      connect.connect();
      this.categories = connect;
    });
    this.recordForm = this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      createdAt: new FormControl()
    });
  }

  saveRecord() {
    this.categories.take(1).subscribe(list => {
      let exists = list.filter(item => item.name === this.recordForm.value.category)[0];
      if (exists) {
        this.categoriesRef.update(exists.$key, { usedCount: exists.usedCount - 1 });
      } else {
        this.categoriesRef.push({
          name: this.recordForm.value.category,
          usedCount: 0
        });
      }
    });
    this.recordForm.patchValue({ createdAt: Date.now() });
    this.records.push(this.recordForm.value).then(() => {
      this.recordForm.reset();
    });

  }

}
