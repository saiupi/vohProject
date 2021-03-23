import { AddTravellersSlideMenuComponent } from './../homepage/myaccount/add-travellers-slide-menu/add-travellers-slide-menu.component';
import { AddtravellersComponent } from './../homepage/myaccount/addtravellers/addtravellers.component';
import { PaymentResponseComponent } from './../homepage/payment-response/payment-response.component';
import { ConfirmationComponent } from './../homepage/confirmation/confirmation.component';
import { RouterModule } from '@angular/router';
import { TransfersComponent } from './../time-line/transfers/transfers.component';
import { StaysComponent } from './../time-line/stays/stays.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineProcessComponent } from '../time-line/timeline-process/timeline-process.component';
import { DailyPlanComponent } from '../time-line/daily-plan/daily-plan.component';
import { FlightsComponent } from '../time-line/flights/flights.component';
import { HotelsComponent } from '../time-line/hotels/hotels.component';
import { ActivitiesComponent } from '../time-line/activities/activities.component';
import { TransportComponent } from '../time-line/transport/transport.component';
import { SharenavComponent } from '../sharenav/sharenav.component';
import { AddDestinationsComponent } from '../destination/add-destinations/add-destinations.component';
import { MapsComponent } from '../destination/maps/maps.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivitiesPreferenceComponent } from '../activities-preference/activities-preference.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; // agm-direction
import { VoyageComponent } from '../time-line/voyage/voyage.component';
import { FlightsBookingComponent } from '../time-line/flights-booking/flights-booking.component';
import { ActivityProcessComponent } from '../time-line/activity-process/activity-process.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { AddActivitiesComponent } from '@app/time-line/add-activities/add-activities.component';
import { SelectActivitiesPreferenceComponent } from '@app/time-line/select-activities-preference/select-activities-preference.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import {
  DurationPipePipe,
  NumberPipe,
  AirlinesImagePipe,
  AirlinesNamePipe,
  TotalDurationPipe,
  FlightsPricePipe,
  HotelsPricePipe,
  TotalPricePipe,
} from '@app/duration-pipe.pipe';
import { AccountModule } from '@app/account/account.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PaymentComponent } from '@app/homepage/payment/payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StaycationComponent } from '@app/staycation/staycation.component';
import { StaycationCitiesComponent } from '@app/staycation/staycation-preview/staycation-preview.component';
import { BookingsComponent } from '@app/homepage/myaccount/bookings/bookings.component';
import { ViewBookingComponent } from '@app/homepage/view-booking/view-booking.component';
import { TravellerSelectionComponent } from '@app/homepage/traveller-selection/traveller-selection.component';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
// import { NgxSliderModule } from 'ng5-slider/options';
import { Ng5SliderModule } from 'ng5-slider';
import { StaycationPaymentComponent } from '@app/homepage/staycation-payment/staycation-payment.component';
import { EntercodeComponent } from '@app/homepage/myaccount/entercode/entercode.component';
import { environment } from '@environments/environment';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { PolicyComponent } from '@app/homepage/policy/policy.component';
import { CanceltripComponent } from '@app/homepage/canceltrip/canceltrip.component';

@NgModule({
  declarations: [
    TotalPricePipe,
    HotelsPricePipe,
    FlightsPricePipe,
    TotalDurationPipe,
    AirlinesNamePipe,
    AirlinesImagePipe,
    DurationPipePipe,
    NumberPipe,
    TimelineProcessComponent,
    DailyPlanComponent,
    FlightsComponent,
    HotelsComponent,
    ActivitiesComponent,
    TransportComponent,
    SharenavComponent,
    AddDestinationsComponent,
    MapsComponent,
    TransfersComponent,
    StaysComponent,
    ActivitiesPreferenceComponent,
    VoyageComponent,
    FlightsBookingComponent,
    ActivityProcessComponent,
    AddActivitiesComponent,
    SelectActivitiesPreferenceComponent,
    ConfirmationComponent,
    PaymentResponseComponent,
    PaymentComponent,
    AddtravellersComponent,
    AddTravellersSlideMenuComponent,
    StaycationComponent,
    StaycationCitiesComponent,
    BookingsComponent,
    ViewBookingComponent,
    TravellerSelectionComponent,
    StaycationPaymentComponent,
    EntercodeComponent,
    PolicyComponent,
    CanceltripComponent,
  ],

  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    MatSlideToggleModule,
    MatSliderModule,
    AccountModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places', 'drawing', 'geometry'],
    }),
    AgmDirectionModule,
    MatInputModule,
    MatFormFieldModule,
    NgxPaginationModule,
    Ng5SliderModule,
    NgxImageZoomModule,
  ],

  exports: [
    TotalPricePipe,
    HotelsPricePipe,
    FlightsPricePipe,
    DurationPipePipe,
    NumberPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimelineProcessComponent,
    DailyPlanComponent,
    FlightsComponent,
    HotelsComponent,
    ActivitiesComponent,
    TransportComponent,
    SharenavComponent,
    AddDestinationsComponent,
    MapsComponent,
    TransfersComponent,
    StaysComponent,
    ActivitiesPreferenceComponent,
    FlightsBookingComponent,
    VoyageComponent,
    ActivityProcessComponent,
    AddActivitiesComponent,
    SelectActivitiesPreferenceComponent,
    ConfirmationComponent,
    PaymentResponseComponent,
    PaymentComponent,
    MatInputModule,
    MatFormFieldModule,
    AddtravellersComponent,
    AddTravellersSlideMenuComponent,
    StaycationComponent,
    StaycationCitiesComponent,
    BookingsComponent,
    ViewBookingComponent,
    NgxPaginationModule,
    TravellerSelectionComponent,
    StaycationPaymentComponent,
    EntercodeComponent,
    PolicyComponent,
    CanceltripComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
})
export class SharedModulesModule {}
