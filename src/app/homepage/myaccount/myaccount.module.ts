import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyaccountPageRoutingModule } from './myaccount-routing.module';

import { MyaccountPage } from './myaccount.page';
import { ProfileComponent } from './profile/profile.component';
import { SharedModulesModule } from '@app/shared-modules/shared-modules.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModulesModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyaccountPageRoutingModule,
  ],
  declarations: [MyaccountPage, ProfileComponent],
})
export class MyaccountPageModule {}
