import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.page.html',
  styleUrls: ['./service-modal.page.scss'],
})
export class ServiceModalPage implements OnInit {
  x: any ;
  client_id: any;
  patient_id: any;
  weight: any;
  service: any;
  veterinarian: any;
  against: any;
  services: any = []
  allservices: any = []
  mobile: any
  constructor(private navParams: NavParams, private api: ApiService, private modalCtrl: ModalController) { 
   
 
  }

  ngOnInit() {
    this.getall()
    this. getservice()
    this.x = this.navParams.get('x');
    this.client_id = this.navParams.get('client_id');
    this.patient_id = this.navParams.get('patient_id');

    if (window.screen.width < 400) { // 768px portrait
      this.mobile = true;
     
    }
    console.log(this.mobile)
  }


  async serve(){
  

 if(this.x == "others"){
      if(this.service && this.veterinarian && this.against){
        this.api.userinfo().then((user)=>{

          const formData: FormData = new FormData();
          formData.append('service', this.service)
          formData.append('weight', this.weight)
          formData.append('veterinarian', this.veterinarian)
          formData.append('against', this.against)
          formData.append('client_id', this.client_id)
          formData.append('patient_id', this.patient_id)
          formData.append('user', user.user_id)
          this.api.add("https://localhost/furcare/user/serve", formData).subscribe((res)=>{
    
            if(res == "1"){
              this.service = ''
              this.weight= ''
              this.veterinarian= ''
              this.against= ''
              this. getservice()
            }
            else{
  
              console.log("error")
            }
    
            
          }, err => {
        
            console.log(err);
            })
  
  
  
        })
      }
     
    
    

    }

    else{

      if(this.veterinarian && this.against){
        this.api.userinfo().then((user)=>{

          const formData: FormData = new FormData();
          formData.append('service', this.x.toLowerCase())
          formData.append('weight', this.weight)
          formData.append('veterinarian', this.veterinarian)
          formData.append('against', this.against)
          formData.append('client_id', this.client_id)
          formData.append('patient_id', this.patient_id)
          formData.append('user', user.user_id)
          this.api.add("https://localhost/furcare/user/serve", formData).subscribe((res)=>{
                if(res == "1"){
                 
              this.weight= ''
              this.veterinarian= ''
              this.against= ''
              this.getservice()
  
                }
                else{
  
                  console.log("error")
                }
  
    
            
          }, err => {
        
            console.log(err);
            })
  
  
  
        })
  

      }
     

      
    


    }
   
   





  }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }


  getall(){

      this.api.get("https://localhost/furcare/user/getall?patient="+this.patient_id).subscribe((res)=>{


      console.log(res)
      this.allservices = res
      })



  }

  getservice(){
    if(this.x == "others"){
      this.api.get("https://localhost/furcare/user/getservice2?patient="+this.patient_id).subscribe((res)=>{
        
        this.services = res
        console.log(this.services)

  })


    }else{
      this.api.get("https://localhost/furcare/user/getservice?patient="+this.patient_id+"&service_type="+this.x.toLowerCase()).subscribe((res)=>{
        
        this.services = res
        console.log(this.services)

  })


    }
 


  }



}
