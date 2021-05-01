import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams, AlertController} from '@ionic/angular';
import { environment } from '../../../environments/environment';
const API_URL = environment.API_URL
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
  constructor(private alert: AlertController,private api: ApiService,private navParams: NavParams, private modalCtrl: ModalController, private toastController: ToastController) {
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
    this.api.get(API_URL+"user/getcurrclient?client_id="+this.client_id).subscribe((res)=>{

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
   
        this.api.add(API_URL+"user/addmedhis", formData).subscribe((res)=>{


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
        this.api.get(API_URL+"user/medhis?patient_id="+this.patient.patient_id).subscribe((res)=>{
                      this.medicalhistory = res;
                     for(let i =0 ; i < this.medicalhistory.length; i++){
                          this.medicalhistory[i].date = new Date(this.medicalhistory[i].date)
                          this.medicalhistory[i].date= this.medicalhistory[i].date.toString().slice(0,24)
                          


                     }

                 


        }, err => {
      
         console.log(err)
        }
        
        
        
        ), err => {
      
          console.log(err)
        }


  }


  async markdeletemedicalhistory(data){
 
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.deletemedhis(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getmedhis()
    
    })

    
  }

  deletemedhis(data){
    
    const formData: FormData = new FormData();
    formData.append('med_id', data.med_id )
    
      this.api.add(API_URL+"user/deletemedhis", formData).subscribe((res)=>{
      
          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }

}
