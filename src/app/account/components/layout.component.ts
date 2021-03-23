import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/account/services';

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
})
export class LayoutComponent {
  constructor(private router: Router, private accountService: AccountService) {
    // redirect to home if already logged in
    // this.accountService.isLoggedIn().then((loggedIn) => {
    //   if (loggedIn) {
    //     this.router.navigate(['/']);
    //   } else {
    //     this.router.navigate(['/account/login']);
    //   }
    // });
  }
}
