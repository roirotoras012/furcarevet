import { Component, OnInit } from '@angular/core';
import { ServiceModalPage } from '../../components/service-modal/service-modal.page';
import { ModalController } from '@ionic/angular';
import { ToastController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-servicepop',
  templateUrl: './servicepop.component.html',
  styleUrls: ['./servicepop.component.scss'],
})
export class ServicepopComponent implements OnInit {
  client_id: any;
  patient_id: any;
  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    this.client_id = this.navParams.get('client_id');
    this.patient_id = this.navParams.get('patient_id');
   }

  ngOnInit() {}

  async vaccination(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      componentProps: {

        x: x,
        client_id: this.client_id,
        patient_id:  this.patient_id,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss();
  
  }
  async deworming(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      componentProps: {
        x: x,
        client_id: this.client_id,
        patient_id:  this.patient_id,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss();
  
  }
  async others(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      componentProps: {

        x: x,
        client_id: this.client_id,
        patient_id:  this.patient_id,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss();
  
  }

}

