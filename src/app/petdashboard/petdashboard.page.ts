import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage'
import { ModalController } from '@ionic/angular';
import { AddpetmodalComponent } from './addpetmodal/addpetmodal.component';
import { ApiService } from '../services/api.service';
declare var myFunction;
@Component({
  selector: 'app-petdashboard',
  templateUrl: './petdashboard.page.html',
  styleUrls: ['./petdashboard.page.scss'],
})
export class PetdashboardPage implements OnInit {
  client_id: any;
  patients: any = []
  constructor(private route:ActivatedRoute,private api: ApiService,private router:Router,private storage: Storage,private modalCtrl: ModalController) {

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

  getpatients(){
    this.client_id = this.route.snapshot.params['client_id']
    this.api.get("https://localhost/furcare/user/getpatients?client_id="+this.client_id).subscribe(res => {
      console.log(res)
     
        this.patients = res;
        console.log(res)
      
      
    
  }, err => {
    
  console.log(err);
  });

    



}

}
