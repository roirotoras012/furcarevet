import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-medicalhistory',
  templateUrl: './medicalhistory.page.html',
  styleUrls: ['./medicalhistory.page.scss'],
})
export class MedicalhistoryPage implements OnInit {
  patient: any = []
  client_id: any;
  client: any = []
  date = new Date().toISOString().slice(0,10)
  medicalhistory: any = []
  description: any;
  constructor(private api: ApiService,private navParams: NavParams, private modalCtrl: ModalController, private toastController: ToastController) {
    this.patient = this.navParams.get('patient');
    this.client_id = this.navParams.get('client_id');
    this.getcurrclient();
    this.getmedhis()
   }
   @ViewChild(IonContent) content: IonContent;

  ngOnInit() {
    
  }
  ionViewWillEnter() {
   

    
   
  }




  getcurrclient(){
    this.api.get("https://localhost/furcare/user/getcurrclient?client_id="+this.client_id).subscribe((res)=>{

        this.client = res[0];
        
    })


  }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }

  async addmedhis(){

    const recordadded = await this.toastController.create({
      message: 'Record Added',
      duration: 2000
      
    });
 
    const error = await this.toastController.create({
      message: 'Connection Error',
      duration: 2000
      
    });
if(this.description){
    const formData: FormData = new FormData();
    formData.append('description', this.description)
    formData.append('patient', this.patient.patient_id)
    formData.append('client', this.client.client_id)
   
        this.api.add("https://localhost/furcare/user/addmedhis", formData).subscribe((res)=>{


                 if(res == 1){
                    recordadded.present()
                    this.getmedhis()
                   
                 }
                 else{
                  error.present()



                 }


        }, err => {
      
          error.present();
        }), err => {
      
          error.present();
        }
        this.description = "";

        
  }

 }

  getmedhis(){
        this.api.get("https://localhost/furcare/user/medhis?patient_id="+this.patient.patient_id).subscribe((res)=>{
                      this.medicalhistory = res;

                 


        }, err => {
      
         console.log(err)
        }
        
        
        
        ), err => {
      
          console.log(err)
        }


  }




}
