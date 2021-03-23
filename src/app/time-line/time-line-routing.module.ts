import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeLinePage } from './time-line.page';

const routes: Routes = [
  {
    path: '',
    component: TimeLinePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeLinePageRoutingModule {}
