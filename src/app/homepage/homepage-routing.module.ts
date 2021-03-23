import { PolicyComponent } from './policy/policy.component';
import { PaymentResponseComponent } from './payment-response/payment-response.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepagePage } from './homepage.page';
import { PreviewiteneraryComponent } from './previewitenerary/previewitenerary.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';
import { StaycationComponent } from '@app/staycation/staycation.component';
import { StaycationCitiesComponent } from '@app/staycation/staycation-preview/staycation-preview.component';
import { BookingsComponent } from './myaccount/bookings/bookings.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { TravellerSelectionComponent } from './traveller-selection/traveller-selection.component';
import { StaycationPaymentComponent } from './staycation-payment/staycation-payment.component';
import { SelectTravellersGuard } from '@app/guards/select-travellers.guard';
import { StaycationPaymentGuardGuard } from '@app/guards/staycation-payment-guard.guard';
import { CustomPaymentGuardGuard } from '@app/guards/custom-payment-guard.guard';
import { CanceltripComponent } from './canceltrip/canceltrip.component';

const routes: Routes = [
  {
    path: '',
    component: HomepagePage,
    children: [
      { path: 'about-us', component: AboutUsComponent },
      {
        path: 'staycation/:packageReference',
        component: StaycationCitiesComponent,
      },
      { path: 'policy', component: PolicyComponent },
      {
        path: 'staycation/:packageReference/:vendor',
        component: StaycationCitiesComponent,
      },
      { path: 'staycation', component: StaycationComponent },
      {
        path: 'category/staycation/:categoryName',
        component: StaycationComponent,
      },
      { path: 'preview', component: PreviewiteneraryComponent },
      { path: 'bookings', component: BookingsComponent },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        canActivate: [CustomPaymentGuardGuard],
      },
      { path: 'payment', component: PaymentComponent },
      { path: 'payment-response', component: PaymentResponseComponent },
      { path: 'view-booking', component: ViewBookingComponent },
      { path: 'cancel-trip', component: CanceltripComponent },
      {
        path: 'travellers',
        component: TravellerSelectionComponent,
        canActivate: [SelectTravellersGuard],
      },
      {
        path: 'staycation-payment',
        component: StaycationPaymentComponent,
        canActivate: [StaycationPaymentGuardGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'myaccount',
        loadChildren: () =>
          import('./myaccount/myaccount.module').then(
            (m) => m.MyaccountPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepagePageRoutingModule {}
