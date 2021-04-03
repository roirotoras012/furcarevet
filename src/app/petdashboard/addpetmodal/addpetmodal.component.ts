import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-addpetmodal',
  templateUrl: './addpetmodal.component.html',
  styleUrls: ['./addpetmodal.component.scss'],
})
export class AddpetmodalComponent implements OnInit {
  name: any;
  species: any ;
  
  birth: any;
  color: any ;
  
  breed: any ;
  
  gender: any;
  microchip: any ;
  dateofimplant: any ;
  client_id: any;
  constructor(private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { }

  ngOnInit() {}
  async add_client(){

    this.client_id = this.navParams.get('client_id');
    const patientadded = await this.toastController.create({
   message: 'Patient Added',
   duration: 2000
   
 });
 const patientnotadded = await this.toastController.create({
   message: 'Invalid Inputs',
   duration: 2000
   
 });


 if(this.name && this.species && this.birth && this.color && this.breed && this.gender && this.microchip && this.dateofimplant){
   this.api.userinfo().then((user)=>{
     

     
     const formData: FormData = new FormData();
     formData.append('name', this.name)
     formData.append('species', this.species)
     formData.append('birth', this.birth)
     formData.append('color', this.color)
     formData.append('breed', this.breed)
     formData.append('microchip', this.microchip)
     formData.append('gender', this.gender)
     formData.append('dateofimplant', this.dateofimplant)
     formData.append('currentuser', user.user_id)
     formData.append('client_id', this.client_id)
 
     this.api.add("https://localhost/furcare/user/addpatient",formData).subscribe(res => {
       console.log(res)
      if(res == "success"){
       patientadded.present();
       this.modalCtrl.dismiss({
         'dismissed': true
       });;
      }
      if(res == "error"){
       patientnotadded.present();
       this.name= ""
       this.species= ""
       this.birth=""
       this.color=""
       this.dateofimplant= ""
       this.breed= ""
       this.microchip=""
       this.gender=""
   
   
      }
       
       
     
   }, err => {
    patientnotadded.present();
   console.log(err);
   });
 

   })

   
 }else{
   patientnotadded.present();
 }
}
}
