import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ConfirmComponent } from '../account/components/confirm.component';
import { LayoutComponent } from '../account/components/layout.component';
import { LoginComponent } from '../account/components/login.component';
import { RegisterComponent } from '../account/components/register.component';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { EnterEmailComponent } from './components/enteremail.component';
import { ForgotOtpConfirmComponent } from './components/forgototpconfirm/forgototpconfirm.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ForgotPasswordComponent,
    EnterEmailComponent,
    ForgotOtpConfirmComponent,
    ConfirmPasswordComponent,
  ],
  exports: [AccountRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
