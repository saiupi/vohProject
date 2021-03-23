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
export class CustomPaymentGuardGuard implements CanActivate {
  paymentStatus: Boolean;
  constructor(private paymentService: PaymentService) {
    this.paymentService.customResponseGuard.subscribe((status) => {
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
