import { Component, OnInit } from '@angular/core';
import { ServiceModalPage } from '../../components/service-modal/service-modal.page';
import { ModalController } from '@ionic/angular';
import { ToastController, NavParams } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'

const API_URL = environment.API_URL
@Component({
  selector: 'app-servicepop',
  templateUrl: './servicepop.component.html',
  styleUrls: ['./servicepop.component.scss'],
})
export class ServicepopComponent implements OnInit {
  patient: any = []
  client: any = []
  client_id: any;
  patient_id: any;
  constructor(private api: ApiService,private modalCtrl: ModalController, private navParams: NavParams, private popover: PopoverController) {
    this.client_id = this.navParams.get('client_id');
    this.patient_id = this.navParams.get('patient_id');
    this.getpatient();
    this.getclient();
   }

  ngOnInit() {}

  async vaccination(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      cssClass: 'servicemodal',
      componentProps: {

        x: x,
        client_id: this.client_id,
        patient_id:  this.patient_id,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss().then(()=>{

      this.popover.dismiss()


  })


  
  }
  getpatient(){
   
   
    this.api.get(API_URL+"user/getpatient?patient="+this.patient_id).subscribe((res)=>{

      this.patient = res[0]
  
        console.log(res)
})


  






}
  

getclient(){
   
   
  this.api.get(API_URL+"user/getclient?client_id="+this.client_id).subscribe((res)=>{

    this.client = res[0]

      console.log(res)
})









}

  async confine(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      cssClass: 'servicemodal1',
      componentProps: {
        x: x,
        client: this.client,
        patient:  this.patient,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss().then(()=>{

        this.popover.dismiss()


    })
  
  }
  async others(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      cssClass: 'servicemodal',
      componentProps: {

        x: x,
        client_id: this.client_id,
        patient_id:  this.patient_id,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss().then(()=>{

      this.popover.dismiss()


  })


  
  }

  async all(x){
    const modal = await this.modalCtrl.create({
      component: ServiceModalPage,
      cssClass: 'servicemodal',
      componentProps: {

        x: x,
        client_id: this.client_id,
        patient_id:  this.patient_id,
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss().then(()=>{

      this.popover.dismiss()


  })


  
  }

}

