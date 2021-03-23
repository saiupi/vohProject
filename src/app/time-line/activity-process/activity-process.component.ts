import { Component, OnInit } from '@angular/core';
import { DestinationsApisService } from '../destinations-apis.service';

@Component({
  selector: 'app-activity-process',
  templateUrl: './activity-process.component.html',
  styleUrls: ['./activity-process.component.scss'],
})
export class ActivityProcessComponent implements OnInit {
  visableVoyaah: boolean;
  activeTab = 'voyage';

  constructor(
    private data: DestinationsApisService,
    private ser: DestinationsApisService
  ) {
    // this.data.currentVoyaahStatus.subscribe((x) => {
    //   this.visableVoyaah = x;
    //  console.log(x, 'Xx',this.visableVoyaah);

    // });
    // this.data.currentNavigationViewStatus.subscribe((x) => {
    //   this.activeTab = x;
    //   console.log(x);

    //  console.log(x.length,this.visableVoyaah,this.activeTab);
    // //  this.data.changeViewStatus(x)
    // });
    this.data.currentVisableStatus.subscribe((x) => {
      console.log(x);
      this.activeTab = x;
      // sessionStorage.setItem('hotelSessionId', '');
    });
  }

  ngOnInit() {}

  hotelTab() {
    var status;
    this.visableVoyaah = false;

    this.data.changeViewStatus('hotelTabPref');
    // this.data.currentHoteListStatus.subscribe(x=>{
    //    status=x;
    // })
    // console.log(status);

    // if(status){
    //   this.data.changeHotelListStatus(status);
    // }
  }
  activitiesTab() {
    console.log('cool');
    this.data.changeViewStatus('ActivitiesPref');
    this.visableVoyaah = false;
  }
  transportTab() {
    this.visableVoyaah = false;
  }
  backclick() {
    this.ser.changeVoyaahStatus(true);
    this.ser.changeViewStatus('');
  }
}
