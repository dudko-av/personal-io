import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public af: AngularFire
  ) { }

  ngOnInit() {
    debugger
  }

  login() {
    debugger
    this.af.auth.login();
  }

}
