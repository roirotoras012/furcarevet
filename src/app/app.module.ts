import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [NgCalendarModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
