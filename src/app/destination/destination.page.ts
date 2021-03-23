import { Component, OnInit } from '@angular/core';
import { DestinationsApisService } from '@app/time-line/destinations-apis.service';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.page.html',
  styleUrls: ['./destination.page.scss'],
})
export class DestinationPage implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  data = [1];
  array = [1];
  dir = undefined;
  zoom = 5;

  array123: any[] = [1, 2];
  fromandtodata: any = [];
  constructor(
    private menu: MenuController,
    private destinationsApisService: DestinationsApisService
  ) {}

  ngOnInit() {
    this.fromandtodata = JSON.parse(sessionStorage.getItem('From-to-data'));
    this.destinationsApisService.showPreviewItenary(false);
    // const map = new Map(this.fromandtodata);
    // console.log(map.get('From'), 'kill');
    // console.log(map.get('To'), 'kill');
  }
  additems() {
    this.data.push(1);
  }

  getitem() {
    this.array.push(1);
  }

  public getDirection() {
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 },
    };
  }

  openFirst() {
    console.log('11111');
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
