import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DestinationPageRoutingModule } from './destination-routing.module';
import { DestinationPage } from './destination.page';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModulesModule,
    ReactiveFormsModule,
    DestinationPageRoutingModule,
  ],
  declarations: [DestinationPage],
})
export class DestinationPageModule {}
