import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MenuController, AngularDelegate } from '@ionic/angular';
import { DestinationsApisService } from './destinations-apis.service';
import { UserItineraryService } from '@app/service-module/user-itinerary.service';
import { DayPlanner } from '@ojashub/voyaah-common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.page.html',
  styleUrls: ['./time-line.page.scss'],
})
export class TimeLinePage implements OnInit {
  visableStatus: any;
  count: any;
  message: any;
  show = true;
  bookNow = true;
  BookNow1: DayPlanner;
  bookNowFlag = false;
  constructor(
    private menu: MenuController,
    private data: DestinationsApisService,
    private UserItinerary: UserItineraryService,
    private router: Router
  ) {
    this.data.currentVisableStatus.subscribe((x) => {
      this.visableStatus = x;
      console.log(x, 'main', this.show);
    });
    // this.Book();
    // this.data.currentTimeLineData.subscribe((x) => {
    //   this.BookNow1 = x;
    //   console.log(this.BookNow1, UserData.dayPlanner, 'BookNow');
    // });
  }

  leftnav = [true, false, false, false, false, false];
  leftprevclick = 0;
  ngOnInit() {
    this.Book();
    this.UserItinerary.timelineDataChange.subscribe((value) => {
      this.Book();
    });
    console.log(this.BookNow1, 'BookNow');
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  leftnavclick(leftcurrentclick) {
    this.leftnav[this.leftprevclick] = false;
    this.leftnav[leftcurrentclick] = true;
    this.leftprevclick = leftcurrentclick;
    this.menu.close('first');
  }
  Book() {
    let UserData = this.UserItinerary.userItineraryData();
    this.BookNow1 = UserData.dayPlanner;
    let hotelsfound = 0;
    let activityfound = 0;
    let flightfound = 0;
    for (let i = 0; i < this.BookNow1?.length; i++) {
      if (this.BookNow1[i].hotelDetails.hotelContent?.hotelId) {
        hotelsfound = 1;
      }
      if (this.BookNow1[i].activityDetails?.length > 0) {
        activityfound = 1;
      }
      if (this.BookNow1[i].flightDetails?.isRefundable) {
        flightfound = 1;
      }
    }
    if (hotelsfound == 1 || (activityfound == 1 && flightfound == 1)) {
      this.bookNowFlag = true;
    } else {
      this.bookNowFlag = false;
    }
  }
  routeToPreview() {
    if (this.bookNowFlag) {
      this.router.navigate(['/preview']);
    }
  }
  gotohome() {
    this.router.navigateByUrl('');
  }
}
