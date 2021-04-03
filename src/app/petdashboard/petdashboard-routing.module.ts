import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetdashboardPage } from './petdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PetdashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetdashboardPageRoutingModule {}
