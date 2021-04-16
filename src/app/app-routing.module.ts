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
    path: 'service-modal',
    loadChildren: () => import('./components/service-modal/service-modal.module').then( m => m.ServiceModalPageModule)
  },
 
  
  
  
















];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
