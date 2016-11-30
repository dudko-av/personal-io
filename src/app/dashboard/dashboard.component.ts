import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdInput } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  list: Observable<any[]>;
  records: FirebaseListObservable<any[]>;
  categories: Observable<any[]>;
  categoriesRef: FirebaseListObservable<any[]>;
  recordForm: FormGroup;
  @ViewChild('ctgInput') ctgInput: MdInput;
  @ViewChild('ctgList') ctgList;
  outlayTotal: Observable<number>;
  outlayToday: Observable<number>;

  constructor(
    private formBuilder: FormBuilder,
    public af: AngularFire
  ) { }

  ngOnInit() { debugger
    this.af.auth.take(1).subscribe((user: FirebaseAuthState) => {
      this.records = this.af.database.list(`/account/${user.uid}/history`);
      this.list = this.records.map(list => list.reverse());
      this.outlayTotal = this.list.map(list => {
        return list.reduce((prev, curr) => prev + curr.amount, 0);
      });
      this.outlayToday = this.list.map(list => {
        let today: any = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today = today.getTime();
        list = list.filter(v => v.createdAt > today);
        return list.reduce((prev, curr) => prev + curr.amount, 0);
      });
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

  ngAfterViewInit() { debugger
    this.ctgInput.onBlur.debounceTime(120).subscribe((e) => {
      this.ctgList.nativeElement.style.display = 'none';
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

  remove(key: string) {
    this.records.remove(key);
  }

}
