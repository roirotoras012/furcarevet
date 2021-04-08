import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { LoginGuardGuard } from './services/login-guard.guard';

const routes: Routes = [
 
  {
    path: '',
    
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: '',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./members/member-routing.module').then( m => m.MemberRoutingModule)
  },
  {
    path: 'schedule-modal',
    loadChildren: () => import('./components/schedule-modal/schedule-modal.module').then( m => m.ScheduleModalPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./components/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'treatmentsheet',
    loadChildren: () => import('./components/treatmentsheet/treatmentsheet.module').then( m => m.TreatmentsheetPageModule)
  },
  {
    path: 'medicalhistory',
    loadChildren: () => import('./components/medicalhistory/medicalhistory.module').then( m => m.MedicalhistoryPageModule)
  },
  
  
  
















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
