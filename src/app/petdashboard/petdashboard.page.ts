import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage'
import { ModalController } from '@ionic/angular';
import { AddpetmodalComponent } from './addpetmodal/addpetmodal.component';
import { ApiService } from '../services/api.service';
import { ServicepopComponent } from '../components/servicepop/servicepop.component';
import { PopoverController } from '@ionic/angular';
import { ScheduleModalPage } from '../components/schedule-modal/schedule-modal.page';
import { TreatmentsheetPage } from '../components/treatmentsheet/treatmentsheet.page';


declare var myFunction;
@Component({
  selector: 'app-petdashboard',
  templateUrl: './petdashboard.page.html',
  styleUrls: ['./petdashboard.page.scss'],
})
export class PetdashboardPage implements OnInit {
  client_id: any;
  patients: any = []
  patientsfilter: any = []
  constructor(private popover: PopoverController,private route:ActivatedRoute,private api: ApiService,private router:Router,private storage: Storage,private modalCtrl: ModalController) {

    this.getpatients();
   }

  ngOnInit() {
  }
  async openadd(){
    this.client_id = this.route.snapshot.params['client_id']
    const modal = await this.modalCtrl.create({
      component: AddpetmodalComponent,
      componentProps:{ client_id: this.client_id

        
      }
    

    });
    
    await modal.present();
    await modal.onWillDismiss();
    this.getpatients();
    
  }
  async servicepop(ev:any){

    const popover = await this.popover.create({
      event: ev,
      component: ServicepopComponent,
      cssClass: 'service-popover'
      
    })
    return await popover.present()


  }
  _ionChange(event) {
    const val = event.target.value;

    this.patientsfilter = this.patients;
    if (val && val.trim() != '') {
      this.patientsfilter = this.patientsfilter.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  
    }
    console.log(this.patientsfilter)
    // this.search.getInputElement().then(item => console.log(item))
  }

  getpatients(){
    this.client_id = this.route.snapshot.params['client_id']
    this.api.get("https://localhost/furcare/user/getpatients?client_id="+this.client_id).subscribe(res => {
      console.log(res)
     
        this.patients = res;
        this.patientsfilter = this.patients
        console.log(res)
      
      
    
  }, err => {
    
  console.log(err);
  });

    



}

async schedule(patient_id){

  const modal = await this.modalCtrl.create({
    component: ScheduleModalPage,
    cssClass: 'cal-modal',
    componentProps: {
      client_id : this.client_id,
      patient_id: patient_id



    }
    

  });
  
  await modal.present();
  await modal.onWillDismiss();

  
}


async treatment(data){

  const modal = await this.modalCtrl.create({
    component: TreatmentsheetPage,
   
    componentProps: {
      client_id : this.client_id,
      patient: data



    }
    

  });
  
  await modal.present();
  await modal.onWillDismiss();

  
}

}
