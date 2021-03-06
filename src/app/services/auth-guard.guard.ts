import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate } from '@angular/router';
import { CanDeactivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(): boolean {
    
    return this.authService.isAuthenticated();
    
  }



} 

