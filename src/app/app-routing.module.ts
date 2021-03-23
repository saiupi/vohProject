import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ActivitiesPreferenceComponent } from './activities-preference/activities-preference.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepagePageModule),
  },
  {
    path: 'destination',
    loadChildren: () =>
      import('./destination/destination.module').then(
        (m) => m.DestinationPageModule
      ),
  },
  {
    path: 'time-line',
    loadChildren: () =>
      import('./time-line/time-line.module').then((m) => m.TimeLinePageModule),
  },
  {
    path: 'activities-preference',
    component: ActivitiesPreferenceComponent,
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
