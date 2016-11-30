import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public router: Router,
    public af: AngularFire
  ) {}

  canActivate(): Observable<boolean> {
    return this.af.auth.take(1).map<boolean>(user => {
      if (!user) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    });
  }

}
