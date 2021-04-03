import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
  },

  // {
  //   path: 'petdashboard',
  //   loadChildren: () => import('../petdashboard/petdashboard.module').then( m => m.PetdashboardPageModule)
  // },

 
  



];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
