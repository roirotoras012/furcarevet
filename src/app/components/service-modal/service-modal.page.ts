import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'

const API_URL = environment.API_URL

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.page.html',
  styleUrls: ['./service-modal.page.scss'],
})
export class ServiceModalPage implements OnInit {
  status = "on"
  date = new Date()
  patient: any = []
  client  : any = []
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
  confinement: any = []

  estimated_cost: any
  deposit: any
  date_of_addmision: any
  date_of_release: any
  confinement_procedure: any
  constructor(private alert: AlertController,public datepipe: DatePipe,private navParams: NavParams, private api: ApiService, private modalCtrl: ModalController) { 


  }
  

  ngOnInit() {
   
    this.getall()
    this. getservice()
    this.getconfinement()
    this.x = this.navParams.get('x');
    this.patient = this.navParams.get('patient');
    this.client = this.navParams.get('client');
    this.client_id = this.navParams.get('client_id');
    this.patient_id = this.navParams.get('patient_id');

    if (window.screen.width < 400) { // 768px portrait
      this.mobile = true;
     
    }
    console.log(this.mobile)
  }

confineserve(){

  if(this.estimated_cost && this.deposit && this.confinement_procedure && this.veterinarian){
 let date1 = new Date(this.date_of_addmision)

 let date2 = new Date(this.date_of_release)
  this.api.userinfo().then((user)=>{
  const formData: FormData = new FormData();
  formData.append('estimated_cost', this.estimated_cost)
  formData.append('veterinarian', this.veterinarian)
  formData.append('deposit', this.deposit)
  formData.append('date_of_addmision', this.datepipe.transform(date1.toLocaleString(), 'yyyy-MM-dd HH:mm'))
  formData.append('date_of_release', this.datepipe.transform(date2.toLocaleString(), 'yyyy-MM-dd HH:mm'))
  formData.append('confinement_procedure', this.confinement_procedure)
  formData.append('patient', this.patient.patient_id)
  formData.append('client', this.client.client_id)
  formData.append('user', user.user_id)
  
  this.api.add(API_URL+"user/confine", formData).subscribe((res)=>{

      if(res == "success"){
          this.modalCtrl.dismiss()


      }
      else if(res=="error"){


        console.log("error")
      }


  })

 




})

  }
}


getconfinement(){

  this.api.get(API_URL+"user/getconfinement?patient="+this.patient.patient_id).subscribe((res)=>{
        
    this.confinement = res
    console.log(this.confinement)

})



}
 


  get sortservice(){
    return this.services.sort((a, b) => {
      return <any>new Date(a.service_date) - <any>new Date(b.service_date);
    });
  }
  get sortallservice(){
    return this.allservices.sort((a, b) => {
      return <any>new Date(a.service_date) - <any>new Date(b.service_date);
    });
  }
  async serve(){
  
console.log(this.x)
 if(this.x == "others"){
   if(this.against == null){


    this.against = ''
   }
  let date = new Date()
      if(this.service && this.veterinarian){
        this.api.userinfo().then((user)=>{

          const formData: FormData = new FormData();
          formData.append('service', this.service)
          formData.append('weight', this.weight)
          formData.append('veterinarian', this.veterinarian)
          formData.append('against', this.against)
          formData.append('client_id', this.client_id)
          formData.append('patient_id', this.patient_id)
          formData.append('user', user.user_id)
          formData.append('service_date',this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
          this.api.add(API_URL+"user/serve", formData).subscribe((res)=>{
    
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

    else if(this.x == "Vaccination"){
      let date = new Date()
      let session = 1
      if(this.veterinarian && this.against){

        if(this.against == "Rabies"){
        
   
          for(let i = 0; i<2 ; i++){
            
            this.api.userinfo().then((user)=>{

              const formData: FormData = new FormData();
              formData.append('service', this.x.toLowerCase())
              formData.append('session', session.toString())
              formData.append('weight', this.weight)
              formData.append('veterinarian', this.veterinarian)
              formData.append('against', this.against)
              formData.append('client_id', this.client_id)
              formData.append('patient_id', this.patient_id)
              formData.append('user', user.user_id)
              formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
              this.api.add(API_URL+"user/serve2", formData).subscribe((res)=>{
                    if(res == "1"){
                      console.log(date.toString())   
                     
                      
                  this.getservice()
      
                    }
                    else{
      
                      console.log("error")
                    }
      
        
                
              }, err => {
            
                console.log(err);
                })
                this.weight = ''

                if(i != 0){
                  const formData1: FormData = new FormData();
                  formData1.append('title', this.x.toLowerCase())
                  formData1.append('session', session.toString())
                  formData1.append('veterinarian', this.veterinarian)
                  formData1.append('description', this.against+','+this.veterinarian)
                  formData1.append('client', this.client_id)
                  formData1.append('patient', this.patient_id)
                  formData1.append('allDay', '1')
                  formData1.append('user', user.user_id)
                  formData1.append('startTime', date.toString())
                  formData1.append('endTime', date.toString())
                  this.api.add(API_URL+"user/addsched", formData1).subscribe((res)=>{
                        if(res == "1"){
                          console.log(date.toString())   
                         
                          
                      this.getservice()
          
                        }
                        else{
          
                          console.log("error")
                        }
          
                        if(i == 1){

                          this.weight = ''
                          this.against = ''
                          this.veterinarian = ''
                        }
                    
                  }, err => {
                
                    console.log(err);
                    })
                    this.weight = ''
                
                }
               
                session ++;
                date.setFullYear(date.getFullYear()+ 1) 
            })
           

         
          }
        
        }
        else if (this.against == "DHLPPI"){
         
          for(let i = 0; i<4 ; i++){
            this.api.userinfo().then((user)=>{

              const formData: FormData = new FormData();
              formData.append('session', session.toString())
              formData.append('service', this.x.toLowerCase())
              formData.append('weight', this.weight)
              formData.append('veterinarian', this.veterinarian)
              formData.append('against', this.against)
              formData.append('client_id', this.client_id)
              formData.append('patient_id', this.patient_id)
              formData.append('user', user.user_id)
              formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
              this.api.add(API_URL+"user/serve2", formData).subscribe((res)=>{
                    if(res == "1"){
                      console.log(date.toLocaleDateString())   
                     
                      
                  this.getservice()
      
                    }
                    else{
      
                      console.log("error")
                    }
      
        
                
              }, err => {
            
                console.log(err);
                })
 this.weight = ''


                if(i != 0){
                  
                  const formData1: FormData = new FormData();
                  formData1.append('title', this.x.toLowerCase())
                  formData1.append('session', session.toString())
                  formData1.append('veterinarian', this.veterinarian)
                  formData1.append('description', 'against: '+this.against+', veterinarian: '+this.veterinarian)
                  formData1.append('client', this.client_id)
                  formData1.append('patient', this.patient_id)
                  formData1.append('allDay', '1')
                  formData1.append('user', user.user_id)
                  formData1.append('startTime', date.toString())
                  formData1.append('endTime', date.toString())
                  this.api.add(API_URL+"user/addsched", formData1).subscribe((res)=>{
                        if(res == "1"){
                          console.log(date.toString())   
                         
                          
                      this.getservice()
          
                        }
                        else{
          
                          console.log("error")
                        }
          
            
                        if(i == 3){

                          this.weight = ''
                          this.against = ''
                          this.veterinarian = ''
                        }
                    
                  }, err => {
                
                    console.log(err);
                    })
          
                }
      
       session ++;
                date.setDate(date.getDate()+ 14) 
                
            })
            
           
          }
        
        }
        else if (this.against == "Bordetella"){
          for(let i = 0; i<2 ; i++){
            this.api.userinfo().then((user)=>{

              const formData: FormData = new FormData();
              formData.append('session', session.toString())
              formData.append('service', this.x.toLowerCase())
              formData.append('weight', this.weight)
              formData.append('veterinarian', this.veterinarian)
              formData.append('against', this.against)
              formData.append('client_id', this.client_id)
              formData.append('patient_id', this.patient_id)
              formData.append('user', user.user_id)
              formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
              this.api.add(API_URL+"user/serve2", formData).subscribe((res)=>{
                    if(res == "1"){
                      console.log(date.toString())   
                     
                      
                  this.getservice()
      
                    }
                    else{
      
                      console.log("error")
                    }
      
        
                
                
              }, err => {
            
                console.log(err);
                })

                this.weight = ''
              
                if(i != 0){
                  const formData1: FormData = new FormData();
                  formData1.append('title', this.x.toLowerCase())
                  formData1.append('session', session.toString())
                  formData1.append('veterinarian', this.veterinarian)
                  formData1.append('description', this.against+','+this.veterinarian)
                  formData1.append('client', this.client_id)
                  formData1.append('patient', this.patient_id)
                  formData1.append('allDay', '1')
                  formData1.append('user', user.user_id)
                  formData1.append('startTime', date.toString())
                  formData1.append('endTime', date.toString())
                  this.api.add(API_URL+"user/addsched", formData1).subscribe((res)=>{
                        if(res == "1"){
                          console.log(date.toString())   
                         
                          
                      this.getservice()
          
                        }
                        else{
          
                          console.log("error")
                        }
          
                        if(i == 1){

                          this.weight = ''
                          this.against = ''
                          this.veterinarian = ''
                        }
                    
                  }, err => {
                
                    console.log(err);
                    })
          
                }
               
        session ++;
                date.setFullYear(date.getFullYear()+ 1) 
            })
           
          }
          
        }
        else if (this.against == "FVRCP"){
          for(let i = 0; i<4 ; i++){
            this.api.userinfo().then((user)=>{

              const formData: FormData = new FormData();
              formData.append('session', session.toString())
              formData.append('service', this.x.toLowerCase())
              formData.append('weight', this.weight)
              formData.append('veterinarian', this.veterinarian)
              formData.append('against', this.against)
              formData.append('client_id', this.client_id)
              formData.append('patient_id', this.patient_id)
              formData.append('user', user.user_id)
              formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
              this.api.add(API_URL+"user/serve2", formData).subscribe((res)=>{
                    if(res == "1"){
                      console.log(date.toLocaleDateString())   
                     
                      
                  this.getservice()
      
                    }
                    else{
      
                      console.log("error")
                    }
      
        
                
              }, err => {
            
                console.log(err);
                })

                this.weight = ''
                
                if(i != 0){
                  const formData1: FormData = new FormData();
                  formData1.append('title', this.x.toLowerCase())
                  formData1.append('session', session.toString())
                  formData1.append('veterinarian', this.veterinarian)
                  formData1.append('description', 'against: '+this.against+', veterinarian: '+this.veterinarian)
                  formData1.append('client', this.client_id)
                  formData1.append('patient', this.patient_id)
                  formData1.append('allDay', '1')
                  formData1.append('user', user.user_id)
                  formData1.append('startTime', date.toString())
                  formData1.append('endTime', date.toString())
                  this.api.add(API_URL+"user/addsched", formData1).subscribe((res)=>{
                        if(res == "1"){
                          console.log(date.toString())   
                         
                          
                      this.getservice()
          
                        }
                        else{
          
                          console.log("error")
                        }
          
                        if(i == 3){

                          this.weight = ''
                          this.against = ''
                          this.veterinarian = ''
                        }
                    
                  }, err => {
                
                    console.log(err);
                    })
          
                }
      
      session ++;
                date.setDate(date.getDate()+ 14) 
            })
           
          }
          
        }
        else if (this.against == "Feline Leukemia"){
          this.api.userinfo().then((user)=>{

            const formData: FormData = new FormData();
            formData.append('service', this.x.toLowerCase())
            formData.append('weight', this.weight)
            formData.append('veterinarian', this.veterinarian)
            formData.append('against', this.against)
            formData.append('client_id', this.client_id)
            formData.append('patient_id', this.patient_id)
            formData.append('user', user.user_id)
            formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
            this.api.add(API_URL+"user/serve2", formData).subscribe((res)=>{
                  if(res == "1"){
                    console.log(date.toLocaleDateString())   
                   
                    
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



        else if(this.against == "Deworming"){
          let date = new Date()
          for(let i = 0; i<4 ; i++){
            this.api.userinfo().then((user)=>{
    
              const formData: FormData = new FormData();
              formData.append('session', session.toString())
              formData.append('service', this.x.toLowerCase())
              formData.append('weight', this.weight)
              formData.append('veterinarian', this.veterinarian)
              formData.append('against', this.against)
              formData.append('client_id', this.client_id)
              formData.append('patient_id', this.patient_id)
              formData.append('user', user.user_id)
              formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
              this.api.add(API_URL+"user/serve2", formData).subscribe((res)=>{
                    if(res == "1"){
                      console.log(date.toLocaleDateString())   
                     
                      
                  this.getservice()
      
                    }
                    else{
      
                      console.log("error")
                    }
      
        
                
              }, err => {
            
                console.log(err);
                })
                this.weight = ''
    
               
                if(i != 0){
                  const formData1: FormData = new FormData();
                  formData1.append('title', this.x.toLowerCase())
                  formData1.append('session', session.toString())
                  formData1.append('veterinarian', this.veterinarian)
                  formData1.append('description', 'against: '+this.against+', veterinarian: '+this.veterinarian)
                  formData1.append('client', this.client_id)
                  formData1.append('patient', this.patient_id)
                  formData1.append('allDay', '1')
                  formData1.append('user', user.user_id)
                  formData1.append('startTime', date.toString())
                  formData1.append('endTime', date.toString())
                  this.api.add(API_URL+"user/addsched", formData1).subscribe((res)=>{
                        if(res == "1"){
                          console.log(date.toString())   
                         
                          
                      this.getservice()
          
                        }
                        else{
          
                          console.log("error")
                        }
          
                        if(i == 3){

                          this.weight = ''
                          this.against = ''
                          this.veterinarian = ''
                        }
                    
                  }, err => {
                
                    console.log(err);
                    })
          
                }
      
       session ++;
                date.setDate(date.getDate()+ 14) 
            })
           
          }
    
        }
          // this.api.userinfo().then((user)=>{

          //   const formData: FormData = new FormData();
          //   formData.append('service', this.x.toLowerCase())
          //   formData.append('weight', this.weight)
          //   formData.append('veterinarian', this.veterinarian)
          //   formData.append('against', this.against)
          //   formData.append('client_id', this.client_id)
          //   formData.append('patient_id', this.patient_id)
          //   formData.append('user', user.user_id)
          //   this.api.add(API_URL+"user/serve", formData).subscribe((res)=>{
          //         if(res == "1"){
                  
          //       this.weight= ''
          //       this.veterinarian= ''
          //       this.against= ''
          //       this.getservice()
    
          //         }
          //         else{
    
          //           console.log("error")
          //         }
    
      
              
          //   }, err => {
          
          //     console.log(err);
          //     })
    
    
    
          // })
    

      }
     

      
    


    }
    
   
   


  

 
  }

  dismissModal(){
    this.modalCtrl.dismiss();
   
  }


  getall(){

      this.api.get(API_URL+"user/getall?patient="+this.patient_id).subscribe((res)=>{


      console.log(res)
      this.allservices = res
      })



  }

  getservice(){
    if(this.x == "others"){
      this.api.get(API_URL+"user/getservice2?patient="+this.patient_id).subscribe((res)=>{
        
        this.services = res
        console.log(this.services)

  })


    }else{
      this.api.get(API_URL+"user/getservice?patient="+this.patient_id+"&service_type="+this.x.toLowerCase()).subscribe((res)=>{
        
        this.services = res
        console.log(this.services)

  })


    }
 


  }


  edit(data){
      data.isEdit = true;


  }

  save(data){
    
    const formData: FormData = new FormData();
    formData.append('service_id', data.service_id)
    formData.append('weight', data.weight)
    formData.append('veterinarian', data.veterinarian)
    this.api.add(API_URL+"user/editserve", formData).subscribe((res)=>{
    
    

    
    
    
    })


    data.isEdit = false;


   

   

  }

  async markalert(data){


  const alert = await this.alert.create({
   
    header: "",
    subHeader: "",
    message: "Are you sure?", 
    buttons: ['Cancel', {
  
      text: 'Mark as Done',
      handler: ()=>{
        
        this.mark(data)
  
      }
  
    }],
  });
  alert.present();
  alert.onDidDismiss().then(()=>{
  
      
  
  })
  }

  mark(data){

    const formData: FormData = new FormData();
        formData.append('service_id', data.service_id)
        
          this.api.add(API_URL+"user/markservice", formData).subscribe((res)=>{

              if(res == "success"){

                data.done = 1;

              }
              if(res== "error"){

                console.log("failed")
              }
                
          })
  
  
  
  }


  delete(data){
    const formData: FormData = new FormData();
    formData.append('service_id', data.service_id)
    
      this.api.add(API_URL+"user/deleteservice", formData).subscribe((res)=>{

          if(res == "success"){

           

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })



  }

  async markdelete(data){
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.delete(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getservice()
    
    })

    
  }

}
