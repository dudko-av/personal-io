import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router) {
    router.events.filter(ev => (ev instanceof NavigationEnd)).subscribe(() => {
      window['componentHandler'].upgradeDom();
    });
  }

}
