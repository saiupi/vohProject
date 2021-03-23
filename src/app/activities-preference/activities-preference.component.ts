import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-preference',
  templateUrl: './activities-preference.component.html',
  styleUrls: ['./activities-preference.component.scss'],
})
export class ActivitiesPreferenceComponent implements OnInit {
  activitiesPreferences: any;
  constructor() {
    this.activitiesPreferences = [
      { id: 1, name: 'Culture', img: 'Group 31520.png' },
      { id: 2, name: 'Outdoor', img: 'Group 31521.png' },
      { id: 3, name: 'Relaxing', img: 'Group 31634.png' },
      { id: 4, name: 'Romantic', img: 'Group 31447.png' },
      { id: 5, name: 'Beaches', img: 'Group 31445.png' },
      { id: 6, name: 'Historic Sites', img: 'Group 31337.png' },
      { id: 7, name: 'Museums', img: 'Group 31212.png' },
      { id: 8, name: 'Shopping', img: 'Group 31272.png' },
      { id: 9, name: 'Wildlife', img: 'Group 31335.png' },
    ];
  }

  ngOnInit() {}
}
