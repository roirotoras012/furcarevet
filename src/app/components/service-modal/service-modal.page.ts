import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { ToastController, NavParams, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { PhotomodalPage } from '../../components/photomodal/photomodal.page';
import { ViewphotopopPage } from '../../components/viewphotopop/viewphotopop.page';

import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

const API_URL = environment.API_URL

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.page.html',
  styleUrls: ['./service-modal.page.scss'],
})
export class ServiceModalPage implements OnInit {
  page = 1;
  count = 0;
  tableSize = 5 ;
  page1 = 1;
  count1 = 0;
  tableSize1 = 5 ;
  page2 = 1;
  count2 = 0;
  tableSize2 = 5 ;

  photoinput: any
  link: any ;
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
  signatureinput: any
  selectedphoto: File
  selectedsignature: File
  photo: any ;
  estimated_cost: any
  deposit: any
  date_of_addmision: any
  date_of_release: any
  confinement_procedure: any
  constructor(private DomSanitizer: DomSanitizer,private popover: PopoverController,private alert: AlertController,public datepipe: DatePipe,private navParams: NavParams, private api: ApiService, private modalCtrl: ModalController) { 


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
  onTableDataChange(event){
    this.page = event;
   
  } 
  onTableDataChange1(event){
    this.page1 = event;

  } 
  onTableDataChange2(event){
    this.page2 = event;

  } 
 
  async image(){
    const modal = await this.popover.create({
      component: PhotomodalPage,
      cssClass: 'photo-popover',
      componentProps: {

       
      }
    
  
    });
    
    await modal.present();
    await modal.onWillDismiss().then((res)=>{
      if(res.data == ''){
          this.photo = '';

      }
      else{

        this.photo = res.data
        this.link = "assets/photos/"+this.photo+".jpg"
      }
     console.log(this.photo)


  })

    
  
  }

  async viewphoto(photo){

    const modal = await this.popover.create({
      component: ViewphotopopPage,
      cssClass: 'viewphoto-popover',
      componentProps: {
        photo: photo
       
      }
    
  
    });
    
    await modal.present();



  }
confineserve(){

  if(this.estimated_cost && this.deposit && this.confinement_procedure && this.veterinarian){
 let date1 = new Date(this.date_of_addmision)

 let date2 = new Date(this.date_of_release)
  this.api.userinfo().then((user)=>{
  const formData: FormData = new FormData();

  if(!this.selectedsignature){
    formData.append('signature', '')

  }
  else if(this.selectedsignature){
    formData.append('signature', this.selectedsignature, this.selectedsignature.name)

  }
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

    for(let i =0; i <this.confinement.length; i++){
      if(this.confinement[i].signature != ''){
        this.confinement[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/confinement/'+this.confinement[i].confinement_id+'/'+this.confinement[i].signature)

      }


    }

    console.log(this.confinement)

})



}
 
get sortconfinement(){
  return this.confinement.sort((a, b) => {
    return <any>new Date(a.released) - <any>new Date(b.released);
  });
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

  selectedFile(event){
    this.selectedphoto = event.target.files[0];
   
  }
  selectedFile2(event){
    this.selectedsignature = event.target.files[0];
   
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
          formData.append('photo', this.photo)
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
              this.link= ''
              this.photo= ''
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
              formData.append('photo', this.photo)
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
                          this.link= ''
                          this.photo= ''
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
              formData.append('photo', this.photo)
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
                          this.link= ''
                          this.photo= ''
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
              formData.append('photo', this.photo)
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
                          this.link= ''
                          this.photo= ''
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
              formData.append('photo', this.photo)
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
                          this.link= ''
                          this.photo= ''
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
            formData.append('photo', this.photo)
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
              formData.append('photo', this.photo)
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
                          this.link= ''
                          this.photo= ''
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

      for(let i =0; i <this.allservices.length; i++){
        if(this.allservices[i].photo != ''){
          this.allservices[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/service/'+this.allservices[i].service_id+'/'+this.allservices[i].photo)

        }


      }
      })



  }

  getservice(){
    if(this.x == "others"){
      this.api.get(API_URL+"user/getservice2?patient="+this.patient_id).subscribe((res)=>{
        
        this.services = res
        console.log(this.services)
        for(let i =0; i <this.services.length; i++){
          if(this.services[i].photo != ''){
            this.services[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/service/'+this.services[i].service_id+'/'+this.services[i].photo)

          }


        }

  })


    }else{
      this.api.get(API_URL+"user/getservice?patient="+this.patient_id+"&service_type="+this.x.toLowerCase()).subscribe((res)=>{
        
        this.services = res
        for(let i =0; i <this.services.length; i++){
          if(this.services[i].photo != ''){
            this.services[i].photolink = this.DomSanitizer.bypassSecurityTrustResourceUrl(API_URL+'uploads/service/'+this.services[i].service_id+'/'+this.services[i].photo)

          }


        }
        console.log(this.services)

  })


    }
 


  }


  edit(data){
      data.isEdit = true;


  }

  save(data){
    
    const formData: FormData = new FormData();
    if(!this.selectedphoto){
      formData.append('photo', '')

    }
    else if(this.selectedphoto){
      formData.append('photo', this.selectedphoto, this.selectedphoto.name)

    }
    
    formData.append('service_id', data.service_id)
    formData.append('weight', data.weight)
    formData.append('veterinarian', data.veterinarian)
    this.api.add(API_URL+"user/editserve", formData).subscribe((res)=>{
    
    

      this.photoinput = null
      this.getservice()
     
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
 let date = new Date()
    const formData: FormData = new FormData();
        formData.append('service_id', data.service_id)
        formData.append('service_date', this.datepipe.transform(date.toLocaleDateString(), 'yyyy-MM-dd'))
          this.api.add(API_URL+"user/markservice", formData).subscribe((res)=>{

              if(res == "success"){

                data.done = 1;
                data.service_date = this.datepipe.transform(date.toLocaleDateString())

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

  async markdeleteconfinement(data){
    const alert = await this.alert.create({
   
      header: "",
      subHeader: "",
      message: "Are you sure?", 
      buttons: ['Cancel', {
    
        text: 'Delete',
        handler: ()=>{
          
          this.deleteconfinement(data)
    
        }
    
      }],
    });
    alert.present();
    alert.onDidDismiss().then(()=>{
    
        this.getconfinement()
    
    })

    
  }

  deleteconfinement(data){

    const formData: FormData = new FormData();
    formData.append('confinement_id', data.confinement_id)
    
      this.api.add(API_URL+"user/deleteconfinement", formData).subscribe((res)=>{

          if(res == "success"){

            

          }
          if(res== "error"){

            console.log("failed")
          }
            
      })

    
  }

}
