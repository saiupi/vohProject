import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { PaymentService } from '@app/service-module/payment.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaycationPaymentGuardGuard implements CanActivate {
  paymentStatus = false;
  constructor(private paymentService: PaymentService) {
    this.paymentService.staycationResponseGuard.subscribe((status) => {
      this.paymentStatus = status;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.paymentStatus) {
      return true;
    } else {
      return false;
    }
  }
}
