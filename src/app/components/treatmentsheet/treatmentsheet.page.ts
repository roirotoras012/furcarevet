import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-treatmentsheet',
  templateUrl: './treatmentsheet.page.html',
  styleUrls: ['./treatmentsheet.page.scss'],
})
export class TreatmentsheetPage implements OnInit {
  patient: any = []

  diagnosis: any;
  bw: any;
  hr: any;
  mm: any;
  pr: any;
  temp: any;
  rr: any;
  crt: any;
  bcs: any;
  fluid: any;
  medication: any;
  comments: any;
  
  am: any;
  pm: any;
  user_Id: any;
  client_id: any;
  

  constructor(private modalCtrl: ModalController, private api: ApiService,public toastController: ToastController, private navParams: NavParams) { 

    
    this.patient = this.navParams.get('patient');
    this.client_id =  this.navParams.get('client_id');

  

  }

  ngOnInit() {
  }
  dismissModal(){
    this.modalCtrl.dismiss();
   
  }
  async addsheet(){
    const sheetadded = await this.toastController.create({
      message: 'Sheet added',
      duration: 2000
      
    });
    const sheetnotadded = await this.toastController.create({
      message: 'Invalid Inputs',
      duration: 2000
      
    });
    const error = await this.toastController.create({
      message: 'Connection Error',
      duration: 2000
      
    });



    if(this.diagnosis && this.bw && this.hr && 
      this.mm && this.pr && this.temp && 
      this.rr && this.crt && this.bcs && 
      this.fluid && this.medication && this.comments
      ){



        if(this.am == null){
          this.am = "none"
    
        }else{
          this.am = this.am.join(', ')
    
        }
        if(this.pm == null){
          this.pm = "none"
    
    
        }else{
          this.pm = this.pm.join(', ')
    
    
        }
          this.api.userinfo().then((user)=>{
            const formData: FormData = new FormData();
            formData.append('diagnosis', this.diagnosis)
            formData.append('bw', this.bw)
            formData.append('hr', this.hr)
            formData.append('mm', this.mm)
            formData.append('pr', this.pr)
            formData.append('temp', this.temp)
            formData.append('rr', this.rr)
            formData.append('crt', this.crt)
            formData.append('bcs', this.bcs)
            formData.append('fluid', this.fluid)
            formData.append('medication', this.medication)
            formData.append('comments', this.comments)
            formData.append('am', this.am)
            formData.append('pm', this.pm)
            formData.append('patient', this.patient.patient_id)
            formData.append('user', user.user_id)
            formData.append('client', this.client_id)
    
            this.api.add("https://localhost/furcare/user/addsheet",formData).subscribe((res)=>{
    
    
    
            if(res == 1){
              console.log("yehey")
              sheetadded.present();
              this.modalCtrl.dismiss({
                'dismissed': true
              });;
    
            }else{
              console.log("wew")
              sheetnotadded.present()
    
            }
    
              
            })
    
    
    
    
    
    
    
          }, err => {
            error.present();
            console.log(err);
            }
            
            
            )









      }else{


        sheetnotadded.present() 


      }
    
      // console.log(this.pm.join(', '))



  }

}
