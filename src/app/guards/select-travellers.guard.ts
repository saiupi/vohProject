import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectTravellersGuard implements CanActivate {
  status = false;
  constructor(private userItineraryService: UserItineraryService) {
    this.userItineraryService.selectTravellerStatus.subscribe((res) => {
      this.status = res;
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
    if (this.status) {
      return true;
    } else {
      return false;
    }
  }
}
