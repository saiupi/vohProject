import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationsApisService } from '@app/time-line/destinations-apis.service';

@Component({
  selector: 'app-sharenav',
  templateUrl: './sharenav.component.html',
  styleUrls: ['./sharenav.component.scss'],
})
export class SharenavComponent implements OnInit {
  showPreviewItinerary: boolean;
  BookNow: any;
  constructor(
    private route: Router,
    private destinationsApisService: DestinationsApisService
  ) {
    this.destinationsApisService.currentTimeLineData.subscribe((x) => {
      this.BookNow = x;
      console.log(this.BookNow, 'BookNow');
    });
  }

  ngOnInit() {
    this.destinationsApisService.currentPrivewItenary.subscribe((res) => {
      this.showPreviewItinerary = res;
    });
  }

  gotohome() {
    this.route.navigateByUrl('');
  }
}
