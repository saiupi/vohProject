import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TimeLinePageRoutingModule } from './time-line-routing.module';
import { TimeLinePage } from './time-line.page';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TimeLinePageRoutingModule,
    SharedModulesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TimeLinePage],
  providers: [DatePipe],
})
export class TimeLinePageModule {}
