import { UserItineraryService } from './service-module/user-itinerary.service';
import { SharedModulesModule } from './shared-modules/shared-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IonicGestureConfig } from '../IonicGestureConfig';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; // agm-direction
import { CitiesListService } from './service-module/cities-list.service';
import { ConfigService } from '@app/config.service';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { MatSliderModule } from '@angular/material/slider';
import { DatePipe, CommonModule } from '@angular/common';
import { AboutUsComponent } from './homepage/about-us/about-us.component';
import { environment } from '@environments/environment';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [AppComponent, AboutUsComponent],
  entryComponents: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModulesModule,
    DragDropModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModulesModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places', 'drawing', 'geometry'],
    }),
    AgmDirectionModule,
    AmplifyUIAngularModule,
    MatSliderModule,
    CommonModule,
    NgxImageZoomModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserItineraryService,
    CitiesListService,
    HttpClientModule,
    ConfigService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
