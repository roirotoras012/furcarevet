import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalhistoryPageRoutingModule } from './medicalhistory-routing.module';

import { MedicalhistoryPage } from './medicalhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalhistoryPageRoutingModule
  ],
  declarations: [MedicalhistoryPage]
})
export class MedicalhistoryPageModule {}
